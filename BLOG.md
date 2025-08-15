# Building ShopSwift: A Full‑Stack E‑commerce App for Mobile and Web

A behind‑the‑scenes look at how I designed and built ShopSwift — a React Native + Expo mobile app with a companion Next.js web app for the storefront/admin experience.

## TL;DR
- Mobile: React Native + Expo, Expo Router, TypeScript, NativeWind
- Web: Next.js (App Router), Tailwind CSS, deployed on Vercel
- Features: Product catalog, cart with persistence, authentication + protected routes, admin dashboard, AI‑assisted product descriptions

## Why I Built This
I wanted an end‑to‑end e‑commerce project that demonstrates cross‑platform UI, clean app architecture, and modern tooling. It showcases how I approach developer experience (DX), maintainability, and feature depth while keeping things fast and responsive.

## Architecture Overview
- Mobile app (Expo): Primary shopping experience optimized for phones/tablets. Uses file‑based routing with Expo Router and AsyncStorage for cart persistence.
- Web app (Next.js in `web/`): A full web experience (storefront + admin). Uses the App Router, Tailwind CSS, and ships easily on Vercel.
- Data layer: The project ships with demo‑friendly product data (`lib/products.ts`) and an authentication context for role‑based access. It’s backend‑ready and designed to be swapped for real services (e.g., REST, GraphQL, Firebase, Supabase).

```
.
├── app/                 # Expo app (mobile)
├── components/          # Shared UI for mobile
├── contexts/            # Auth + Cart contexts (mobile)
├── hooks/               # Custom hooks (mobile)
├── lib/                 # Demo products and types
└── web/                 # Next.js web app
```

## Tech Stack
- Mobile Framework: React Native with Expo
- Navigation: Expo Router (file‑based routing)
- Language: TypeScript end‑to‑end
- State: React Context (Auth, Cart) + AsyncStorage (mobile)
- Styling (mobile): NativeWind
- Styling (web): Tailwind CSS
- Web Framework: Next.js (App Router)

## Core Features
### Product Catalog
- Search, category filters, responsive grid cards
- Reusable `ProductCard` component for consistency across lists/details

### Shopping Cart with Persistence
- Context for global state
- AsyncStorage for saving cart across sessions

```typescript
// Mobile: consuming the cart context
const { addToCart, removeFromCart, updateQuantity } = useCart();
```

### Authentication + Role‑Based Access
- Email/password demo accounts
- Protected routes and admin‑only dashboard

```typescript
// Mobile: simple protection using Expo Router
useEffect(() => {
  if (!user && !inAuthGroup) {
    router.replace('/(auth)/login');
  }
}, [user, segments]);
```

### Admin Dashboard
- Add, edit, and delete products
- Inventory visibility and simple analytics
- AI‑assisted description enhancement to speed up content creation

### AI‑Assisted Product Descriptions
- Mobile: an abstraction via a `useAIEnhancement` hook so the UI stays simple
- Web: Next.js integrates AI tooling, making it easy to enhance or validate content server‑side

```typescript
// Mobile: trigger an enhancement in the UI flow
const { enhanceDescription, isLoading } = useAIEnhancement();
const result = await enhanceDescription(description, name, category);
```

## Notable Implementation Details
### File‑Based Routing on Mobile (Expo Router)
- Keeps navigation declarative and colocated with screens
- Clean redirects for auth and admin areas

### Next.js App Router on Web
- Modern, file‑system routes and server components where it makes sense
- Dev server with Turbopack (`npm run dev` in `web/`) for fast iteration

### Styling System
- Mobile: NativeWind brings Tailwind‑like ergonomics to React Native
- Web: Tailwind CSS for speed, theming consistency, and utility‑first workflows

### Images and Performance
- Web image domains are whitelisted in `web/next.config.ts` to keep Next/Image safe and optimized
- Mobile uses `expo-image` for efficient loading/caching

## Developer Experience (DX)
- TypeScript everywhere
- Clear folder conventions (features/components/contexts/hooks)
- Strict lint/type checks for the web app; build‑time checks for mobile
- Fast local loops:
  - Mobile: `npm start` then `npm run ios | android`
  - Web: `cd web && npm run dev` (defaults to port 9002)

## Deployment
### Mobile (Expo)
- Local development via Expo Go
- Ready for production via EAS Build/Submit (optional)

### Web (Next.js)
- Vercel (recommended): import the `web/` directory, build with `npm run build`, run with `next start`
- Netlify/others: use Next.js adapters or a Node server

## Challenges & Lessons Learned
- Sharing concepts, not code: UI primitives differ between React Native and the web. I focused on shared patterns (naming, props, structure) rather than forcing shared components.
- Storage differences: AsyncStorage on mobile vs. browser storage/SSR on web. Abstracting data access behind hooks keeps the UI stable.
- Routing parity: Expo Router and Next.js App Router feel similar conceptually, which made mental models simple across platforms.
- AI integration ergonomics: Treat AI as a capability behind a hook/service; the UI shouldn’t care if it’s a mock, SDK call, or server action.

## What’s Next
- Real payment flow (e.g., Stripe)
- Backend integration for products, inventory, and user profiles
- Order history and email notifications
- More robust analytics in the admin dashboard

## How to Explore the Code
- Mobile app: start at `app/(tabs)/index.tsx` and `contexts/`
- Web app: `web/src/app/` (App Router), `web/next.config.ts`, and `web/package.json`

## Screenshots (Optional)
Add screenshots to your portfolio and link them here:
- Mobile: Home, Product Details, Cart, Checkout
- Web: Storefront, Admin Dashboard, AI Enhancement modal

---
If you’re hiring or curious about the implementation details, I’m happy to walk through the code live and discuss trade‑offs and roadmap ideas. 

## AI on the Web with Genkit (Next.js)
To keep the AI layer maintainable, the web app encapsulates prompts and flows with Genkit and a Google AI model.

- Setup lives in `web/src/ai/genkit.ts` and uses `googleai/gemini-2.0-flash` by default.
- A concrete example is the product description enhancer flow at `web/src/ai/flows/product-description-enhancer.ts`.

```ts
// web/src/ai/genkit.ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
```

```ts
// web/src/ai/flows/product-description-enhancer.ts (excerpt)
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
```

This makes it trivial to iterate on prompts and swap models without touching UI components. It also keeps server concerns (secrets, quotas) away from client code. 