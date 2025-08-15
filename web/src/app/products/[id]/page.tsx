'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-provider';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const id = typeof params.id === 'string' ? params.id : '';
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg overflow-hidden shadow-lg shadow-primary/10">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint={`${product.category} product`}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="w-fit">{product.category}</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">{product.name}</h1>
          <p className="text-muted-foreground text-lg">
            {product.description}
          </p>
          <p className="text-4xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <Button size="lg" onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
