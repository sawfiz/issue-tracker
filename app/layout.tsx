import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="inter.variable">
      <body className={inter.className}>
        <Theme accentColor="violet">
            <NavBar />
            <main className="px-5">
              <Container>{children}</Container>
            </main>
        </Theme>
      </body>
    </html>
  );
}
