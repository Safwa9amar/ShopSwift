# ShopSwift - E-commerce Mobile App

A full-featured e-commerce mobile application built with React Native and Expo, featuring product browsing, shopping cart, user authentication, and an AI-powered admin dashboard.

## Features

### 🛍️ Product Management
- **Product Catalog**: Browse products with search and category filtering
- **Product Details**: View detailed product information with images and descriptions
- **Grid Layout**: Responsive product grid with beautiful cards

### 🛒 Shopping Cart
- **Global State Management**: React Context for cart state
- **Persistent Storage**: Cart data saved to device storage
- **Quantity Management**: Add, remove, and update item quantities
- **Price Calculation**: Real-time subtotal and total calculation

### 🔐 User Authentication
- **Login/Signup**: Email and password authentication
- **Guest Access**: Browse products without creating an account
- **Profile Management**: User profile with admin role detection
- **Protected Routes**: Secure admin access

### 🎯 Admin Dashboard
- **Product Management**: Add, edit, and delete products
- **AI-Powered Enhancement**: Enhance product descriptions with AI
- **Inventory Control**: Track stock levels and availability
- **Analytics Overview**: Product statistics and insights

### 🤖 AI Features
- **Description Enhancement**: AI-powered product description improvement
- **Smart Suggestions**: Context-aware recommendations
- **SEO Optimization**: Enhanced content for better search visibility

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router with file-based routing
- **State Management**: React Context + AsyncStorage
- **UI Components**: Custom components with NativeWind styling
- **Icons**: Expo Vector Icons
- **Images**: Expo Image for optimized image handling

## Project Structure

```
app/
├── (tabs)/           # Main tab navigation
│   ├── index.tsx     # Home screen
│   ├── products.tsx  # Products catalog
│   ├── cart.tsx      # Shopping cart
│   └── profile.tsx   # User profile
├── (auth)/           # Authentication screens
│   ├── login.tsx     # Login screen
│   └── signup.tsx    # Signup screen
├── admin/            # Admin dashboard
│   ├── index.tsx     # Admin home
│   ├── add-product.tsx # Add product form
│   └── products.tsx  # Product management
├── product/          # Product details
│   └── [id].tsx     # Dynamic product page
└── checkout.tsx      # Checkout process

components/
├── ui/               # Reusable UI components
│   ├── Button.tsx    # Custom button component
│   ├── Input.tsx     # Custom input component
│   └── Card.tsx      # Card container component
├── ProductCard.tsx   # Product display component
└── ...               # Other components

contexts/
├── AuthContext.tsx   # Authentication state management
└── CartContext.tsx   # Shopping cart state management

hooks/
├── useAIEnhancement.ts # AI enhancement hook
└── ...               # Other custom hooks

lib/
└── products.ts       # Product data and types
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopswift
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web browser
npm run web
```

## Demo Credentials

### Admin Account
- **Email**: admin@shopswift.com
- **Password**: admin123

### User Account
- **Email**: user@shopswift.com
- **Password**: user123

## Key Features Implementation

### Shopping Cart
The cart uses React Context for global state management and AsyncStorage for persistence:

```typescript
const { addToCart, removeFromCart, updateQuantity } = useCart();
```

### AI Enhancement
The AI feature simulates API calls to enhance product descriptions:

```typescript
const { enhanceDescription, isLoading } = useAIEnhancement();
const result = await enhanceDescription(description, name, category);
```

### Authentication Flow
Protected routes automatically redirect unauthenticated users:

```typescript
useEffect(() => {
  if (!user && !inAuthGroup) {
    router.replace('/(auth)/login');
  }
}, [user, segments]);
```

## Customization

### Adding New Products
1. Navigate to Admin Dashboard
2. Click "Add Product"
3. Fill in product details
4. Use "Enhance with AI" for better descriptions
5. Save the product

### Modifying UI Components
All UI components are custom-built and can be easily modified in the `components/ui/` directory.

### Styling
The app uses a consistent design system with:
- Primary color: #007AFF
- Secondary color: #F2F2F7
- Error color: #FF3B30
- Success color: #34C759

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React Native and Expo
