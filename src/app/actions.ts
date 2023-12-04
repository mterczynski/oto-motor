'use server'

import { revalidatePath } from 'next/cache'
import { CreateSaleOfferFormData } from './offers/create/page'
import { prisma } from '../../prisma/prisma';
import { z } from 'zod';
import { SaleOffer } from './types/saleOffer';

export interface FormState {
  message?: "success" | 'error',
  errors?: Partial<Record<keyof CreateSaleOfferFormData, string>>,
  fieldValues: CreateSaleOfferFormData
}

export async function createOffer(prevState: FormState, formData: FormData): Promise<FormState> {
  const requestBody = {
    brand: formData.get('brand'),
    description: formData.get('description'),
    location: formData.get('location'),
    mileageInKm: parseInt(formData.get('mileageInKm') as string),
    model: formData.get('model'),
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
    console.error('validation error', err)
  }
}

export async function getOffers(): Promise<SaleOffer[]> {
  return (await prisma.saleOffer.findMany({})).map(offer => {
    return { ...offer, distanceInKm: 0 }
  });
}
