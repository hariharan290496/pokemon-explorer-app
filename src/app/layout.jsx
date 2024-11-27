/* eslint-disable react/jsx-filename-extension */
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import Providers from '../components/Providers';
import NavBar from '../components/NavBar/NavBar';

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
        <AuthProvider>
          <Providers>
            <NavBar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
