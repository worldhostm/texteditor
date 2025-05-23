import "./globals.css";
import Header from "./_components/Header";
import { Metadata } from "next";
import Footer from "./_components/Footer";
import { headers } from "next/headers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/favicon.png",
        href: "/images/favicon.png",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
