import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Admin: Livraria Indietora",
  description: "Livraria para locação e avaliação de livros",
  keywords: ["Livraria", "Livros", "Compra de Livros"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Toaster richColors position="top-right" />
        <Titulo />
        {children}
      </body>
    </html>
  );
}
