/* eslint-disable react/jsx-filename-extension */
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Pokédex Explorer",
  description: "Explore the world of Pokémon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <nav className="pokemon-gradient text-white">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center">Pokédex Explorer</h1>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
