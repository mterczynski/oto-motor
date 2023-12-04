'use server'

import { revalidatePath } from 'next/cache'
import { CreateSaleOfferFormData } from './offers/create/page'
import { prisma } from '../../prisma/prisma';
import { ZodError, z } from 'zod';
import { SaleOffer } from './types/saleOffer';

export interface FormState {
  message?: "success" | 'error',
  errors?: Partial<Record<keyof CreateSaleOfferFormData, string>>,
  fieldValues: CreateSaleOfferFormData
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
  return (await prisma.saleOffer.findMany({})).map(offer => {
    return { ...offer, distanceInKm: 0 }
  });
}
