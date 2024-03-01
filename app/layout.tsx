import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mezo-GPT",
    default: "Mezo-GPT",
  },
  openGraph: {
    title: "Mezo-GPT",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}`,
    images: [
      {
        url: `${process.env.SITE_URL}/opengraph-imageConfigDefault.png`,
        width: 600,
        height: 600,
      },
    ],
    description:
      "chat app like Chat-gpt and tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
  },
  description:
    "chat app like Chat-gpt and tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
