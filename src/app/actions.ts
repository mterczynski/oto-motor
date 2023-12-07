'use server'

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { ZodError, z } from 'zod';
import { prisma } from '../../prisma/prisma';
import { s3Client } from './awsS3Client';
import { CreateSaleOfferFormData } from './offers/create/page';
import { SaleOffer } from './types/saleOffer';

export interface FormState {
  message?: "success" | 'error',
  errors?: Partial<Record<keyof CreateSaleOfferFormData, string>>,
  fieldValues: CreateSaleOfferFormData
}

async function uploadImage(image: File) {
  const originalImageName = image.name
  const fileExtension = originalImageName.split('.').slice(-1)[0]
  const imageName = 'image' + uuidv4() + '.' + fileExtension
  // todo - move bucket link to .env or to an settings object
  const bucketLink = 'https://next-app-demo-bucket.s3.eu-central-1.amazonaws.com'
  const imageBuffer = await image.arrayBuffer()
  // todo - move bucket name to .env or to an settings object
  const putCommand = new PutObjectCommand({ Bucket: 'next-app-demo-bucket', Key: imageName, Body: imageBuffer as any })

  await s3Client.send(putCommand)
  return { imageName, imageLink: `${bucketLink}/${imageName}` }
}

export async function createOffer(prevState: FormState, formData: FormData): Promise<FormState> {
  const requestBody = {
    brand: formData.get('brand') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    mileageInKm: parseInt(formData.get('mileageInKm') as string),
    model: formData.get('model') as string,
    priceInPLN: parseInt(formData.get('priceInPLN') as string),
    imageLink: ''
  }

  const image = formData.get('image') as File | undefined

  if (!image) {
    return {
      message: "error",
      errors: {
        // todo - fill errors for image input
      },
      fieldValues: {
        brand: '',
        description: '',
        location: '',
        mileageInKm: 0,
        model: '',
        priceInPLN: 0
      }
    }
  }

  const { imageLink } = await uploadImage(image)
  requestBody.imageLink = imageLink

  const schema = z.object({
    brand: z.string().min(1),
    description: z.string().optional(),
    location: z.string().min(1),
    mileageInKm: z.number().int().min(1),
    model: z.string().min(1),
    priceInPLN: z.number().int().min(1),
    imageLink: z.string().optional(),
  })

  try {
    const validatedData = schema.parse(requestBody)
    try {
      const createdOffer = await prisma.saleOffer.create({ data: validatedData });

      revalidatePath('/')
      return {
        message: "success",
        errors: {},
        fieldValues: createdOffer
      }
    } catch (e) {
      return {
        message: "error",
        errors: {

        },
        fieldValues: {
          brand: '',
          description: '',
          location: '',
          mileageInKm: 0,
          model: '',
          priceInPLN: 0
        }
      }
    }
  } catch (err) {
    const errors = (err as ZodError).flatten().fieldErrors

    return {
      message: 'error',
      // todo - use an util for it, but check zod capabilities first
      errors: {
        brand: errors.brand?.[0] ?? '',
        description: errors.description?.[0] ?? '',
        location: errors.location?.[0] ?? '',
        mileageInKm: errors.mileageInKm?.[0] ?? '',
        model: errors.model?.[0] ?? '',
        priceInPLN: errors.priceInPLN?.[0] ?? '',
      },
      fieldValues: requestBody
    }
  }
}

export async function getOffers(): Promise<SaleOffer[]> {
  try {
    return (await prisma.saleOffer.findMany({})).map(offer => {
      return { ...offer, distanceInKm: 0 }
    });
  } catch (error: any) {
    if (error?.code === 'P2021') { // P2021 = table not found
      return []
    } else {
      throw error
    }
  }
}

export async function getOfferById(id: number): Promise<SaleOffer | null> {
  const foundOffer = await prisma.saleOffer.findFirst({ where: { id } })

  if (foundOffer) {
    return { ...foundOffer, distanceInKm: 0, }
  }
  return null
}
