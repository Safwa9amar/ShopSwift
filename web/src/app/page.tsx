'use client';

import { useState } from 'react';
import ProductCard from '@/components/product-card';
import { products as allProducts } from '@/lib/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))];

  const filteredProducts = allProducts
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      category === 'all' ? true : product.category === category
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Welcome to ShopSwift
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover our exclusive collection of products.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-xs"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No products found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
