'use server';

import { enhanceProductDescription } from '@/ai/flows/product-description-enhancer';
import { z } from 'zod';
import { products } from './products';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from './types';

export async function enhanceDescriptionAction(description: string) {
  try {
    const result = await enhanceProductDescription({ description });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to enhance description.' };
  }
}

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL'),
});


export async function addProductAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = productSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newProduct: Product = {
    id: uuidv4(),
    ...validatedFields.data,
  };

  // In a real app, you would save this to a database.
  // Here we just add it to the in-memory array.
  products.unshift(newProduct);
  
  return { success: true };
}
