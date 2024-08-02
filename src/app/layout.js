import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from '@/redux/providers'

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "400", "700"] });

export const metadata = {
  title: "ARtesano E-commerce",
  description: "Portal de venta de artesanías",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html >
  );
}