import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/navbar";

export const metadata: Metadata = {
  title: "MyVitaBuilder",
  description: "Build and increase your vitality!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="content">
        <NavBar/>
        
        {children}
   
      </body>
    </html>
  );
}
