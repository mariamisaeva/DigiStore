// import Hero from './_Components/Hero';
// import ProductSection from './_Components/ProductSection';

// export default function Home() {
//   return (
//     <div>
//       <Hero />
//       <ProductSection />
//     </div>
//   );
// }
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
