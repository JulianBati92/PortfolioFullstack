import type { Metadata } from "next";
import "./globals.css";

const title = "Julián Batistutti — Full Stack Developer";
const description = "Portfolio de Julián Batistutti, desarrollador full stack argentino. Proyectos web, e-commerce, automatización y sistemas de gestión.";

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
