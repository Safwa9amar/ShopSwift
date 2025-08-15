'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { enhanceDescriptionAction, addProductAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Wand2 } from 'lucide-react';
import type { EnhanceProductDescriptionOutput } from '@/ai/flows/product-description-enhancer';
import { useToast } from '@/hooks/use-toast';

const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  category: z.string().min(2, { message: 'Category must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function ProductForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<EnhanceProductDescriptionOutput | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
    },
  });

  const handleEnhanceDescription = async () => {
    const description = form.getValues('description');
    if (!description || description.length < 10) {
      toast({
        variant: 'destructive',
        title: 'Description too short',
        description: 'Please provide a longer description to enhance.',
      });
      return;
    }
    setIsEnhancing(true);
    setEnhancedResult(null);
    const result = await enhanceDescriptionAction(description);
    if (result.success && result.data) {
      setEnhancedResult(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Enhancement Failed',
        description: result.error,
      });
    }
    setIsEnhancing(false);
  };

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const result = await addProductAction(formData);

    if (result?.success) {
      toast({
        title: 'Product Added',
        description: `${data.name} has been successfully added.`,
      });
      router.push('/admin/products');
    } else if (result?.errors) {
       Object.values(result.errors).flat().forEach(error => {
         toast({
           variant: 'destructive',
           title: 'Invalid Input',
           description: error,
         });
       });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Fill in the details for the new product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...form.register('name')} />
            {form.formState.errors.name && <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Description</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleEnhanceDescription} disabled={isEnhancing}>
                {isEnhancing ? <Wand2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />}
                Enhance with AI
              </Button>
            </div>
            <Textarea id="description" {...form.register('description')} rows={5} />
            {form.formState.errors.description && <p className="text-destructive text-sm">{form.formState.errors.description.message}</p>}
          </div>

          {enhancedResult && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>AI Enhancement Suggestion</AlertTitle>
              <AlertDescription className="space-y-4">
                <div>
                  <p className="font-semibold">Feedback:</p>
                  <p>{enhancedResult.feedback}</p>
                </div>
                <div>
                  <p className="font-semibold">Suggestion:</p>
                  <p className="p-2 bg-muted rounded-md">{enhancedResult.enhancedDescription}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      form.setValue('description', enhancedResult.enhancedDescription);
                      setEnhancedResult(null);
                    }}
                  >
                    Use Suggestion
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setEnhancedResult(null)}>
                    Dismiss
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" {...form.register('price')} />
              {form.formState.errors.price && <p className="text-destructive text-sm">{form.formState.errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...form.register('category')} />
              {form.formState.errors.category && <p className="text-destructive text-sm">{form.formState.errors.category.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" {...form.register('imageUrl')} placeholder="https://..." />
            {form.formState.errors.imageUrl && <p className="text-destructive text-sm">{form.formState.errors.imageUrl.message}</p>}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  );
}
