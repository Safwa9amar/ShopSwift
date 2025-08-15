import ProductForm from '@/components/product-form';

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product listing for your store.
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
