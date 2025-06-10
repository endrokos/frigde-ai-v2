import "./globals.css";

export const metadata = {
  title: "Generador de Dietas",
  description: "App de dietas personalizada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
