export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
    price: 129.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance. Track your workouts and health metrics.',
    price: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable cotton t-shirt made from organic materials. Available in multiple colors and sizes.',
    price: 29.99,
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly water bottle that keeps drinks cold for 24 hours and hot for 12 hours. Perfect for outdoor activities.',
    price: 24.99,
    category: 'Home & Garden',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact and powerful speaker with 360-degree sound. Waterproof design perfect for outdoor use.',
    price: 79.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    inStock: false,
  },
  {
    id: '6',
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and RFID protection. Classic design for everyday use.',
    price: 49.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: '8',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials. Perfect thickness for comfort during practice.',
    price: 34.99,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    inStock: true,
  },
];

export const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Accessories', 'Sports']; 