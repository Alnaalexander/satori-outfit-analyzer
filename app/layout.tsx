import "@/styles/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SATORI - The Outfit Analyzer",
  description: "Create stylish and coordinated outfits with SATORI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-coral-pink-50`}>{children}</body>
    </html>
  )
}



import './globals.css'