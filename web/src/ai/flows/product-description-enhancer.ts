// product-description-enhancer.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for enhancing product descriptions.
 *
 * The flow takes a product description as input and uses an LLM to suggest edits for clarity and marketing appeal.
 * It exports the enhanceProductDescription function, the EnhanceProductDescriptionInput type, and the EnhanceProductDescriptionOutput type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceProductDescriptionInputSchema = z.object({
  description: z.string().describe('The product description to be enhanced.'),
});
export type EnhanceProductDescriptionInput = z.infer<typeof EnhanceProductDescriptionInputSchema>;

const EnhanceProductDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The enhanced product description with improved clarity and marketing appeal.'),
  feedback: z.string().describe('Feedback on the original description and the changes made.'),
});
export type EnhanceProductDescriptionOutput = z.infer<typeof EnhanceProductDescriptionOutputSchema>;

export async function enhanceProductDescription(input: EnhanceProductDescriptionInput): Promise<EnhanceProductDescriptionOutput> {
  return enhanceProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceProductDescriptionPrompt',
  input: {schema: EnhanceProductDescriptionInputSchema},
  output: {schema: EnhanceProductDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter. Review the following product description and provide an enhanced version with improved clarity and marketing appeal.

Original Description: {{{description}}}

In addition to the enhanced description, provide feedback on the original description and explain the changes you made, along with the reasons for those changes.

Ensure the enhanced description is engaging and persuasive, highlighting the key benefits of the product.  The tone should be appropriate for the product type.
`,
});

const enhanceProductDescriptionFlow = ai.defineFlow(
  {
    name: 'enhanceProductDescriptionFlow',
    inputSchema: EnhanceProductDescriptionInputSchema,
    outputSchema: EnhanceProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
