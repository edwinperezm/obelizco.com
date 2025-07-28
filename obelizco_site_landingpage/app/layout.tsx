import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

export const metadata: Metadata = {
  title: "obe&liz.co - Educación Cristocéntrica en el Hogar",
  description:
    "Transforma tu hogar en el centro del aprendizaje con currículos cristocéntricos que nutren el corazón, la mente y el espíritu de tus hijos.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${dmSerifDisplay.variable} font-sans`}>{children}</body>
    </html>
  )
}
