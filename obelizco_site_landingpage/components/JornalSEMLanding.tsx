"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea" // Import Textarea
import {
  Star,
  Check,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  Clock,
  Download,
  Cross,
  Target,
  MessageSquare,
  ClipboardList,
  Printer,
  Infinity,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function JornalSEMLanding() {
  const [isLoading, setIsLoading] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [rating, setRating] = useState(0) // State for star rating
  const [reviewText, setReviewText] = useState("") // State for review text

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      setShowStickyBar(window.scrollY > heroHeight)
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handlePurchase = () => {
    setIsLoading(true)
    // Simulate purchase process
    setTimeout(() => {
      alert("¡Gracias por tu compra! Recibirás el Jornal en tu email.")
      setIsLoading(false)
    }, 2000)
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Por favor, selecciona una calificación de estrellas.")
      return
    }
    if (reviewText.trim() === "") {
      alert("Por favor, escribe tu reseña.")
      return
    }
    alert(`Reseña enviada: Calificación ${rating} estrellas, Texto: "${reviewText}"`)
    setRating(0)
    setReviewText("")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const includedBlocks = [
    {
      imageQuery: "father and child reading bible together",
      features: [
        {
          title: "21 Reflexiones Diarias",
          description: "Meditaciones centradas en Cristo para comenzar cada día con propósito y dirección espiritual",
          icon: BookOpen,
        },
        {
          title: "Versículos Temáticos",
          description:
            "Escrituras cuidadosamente seleccionadas para fortalecer la fe familiar y el crecimiento espiritual",
          icon: Cross,
        },
      ],
    },
    {
      imageQuery: "family doing creative activity together",
      features: [
        {
          title: "Actividades Prácticas",
          description: "Ejercicios interactivos para aplicar las enseñanzas en la vida diaria de tu familia",
          icon: Target,
        },
        {
          title: "Preguntas de Reflexión",
          description: "Para profundizar en la aplicación personal y familiar de cada enseñanza",
          icon: MessageSquare,
        },
      ],
    },
    {
      imageQuery: "mother and child praying together",
      features: [
        {
          title: "Rutinas Espirituales",
          description: "Estructura clara para establecer hábitos cristianos duraderos en tu hogar",
          icon: Clock,
        },
        {
          title: "Guía de Implementación",
          description: "Instrucciones paso a paso para usar el jornal efectivamente desde el día uno",
          icon: ClipboardList,
        },
      ],
    },
    {
      imageQuery: "family enjoying quiet time at home",
      features: [
        {
          title: "Formato PDF Imprimible",
          description: "Diseño hermoso y funcional optimizado para imprimir en casa con calidad profesional",
          icon: Printer,
        },
        {
          title: "Acceso de por Vida",
          description: "Descarga inmediata y acceso permanente al contenido, sin suscripciones ni pagos adicionales",
          icon: Infinity,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Enhanced Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo-obeliz.svg"
                alt="obe&liz.co"
                width={180}
                height={50}
                className="h-8 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("incluye")}
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
              >
                Qué Incluye
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("testimonios")}
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
              >
                Experiencia
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
              >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="font-serif text-2xl font-bold text-orange-600">$29</div>
                <div className="text-xs text-gray-500">USD</div>
              </div>
              <Button
                onClick={handlePurchase}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <BookOpen className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {isLoading ? "Procesando..." : "Comprar Ahora"}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <button
                  onClick={() => scrollToSection("incluye")}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 font-medium transition-all duration-300 hover:pl-2"
                >
                  Qué Incluye
                </button>
                <button
                  onClick={() => scrollToSection("testimonios")}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 font-medium transition-all duration-300 hover:pl-2"
                >
                  Experiencia
                </button>
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-gray-900 py-2 font-medium transition-all duration-300 hover:pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Volver al Inicio
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handlePurchase()
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-medium"
                  >
                    Comprar Ahora - $29
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Desktop Optimized */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-32">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-20 lg:opacity-30">
            <div className="w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-15 lg:opacity-20"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-48 h-48 lg:w-80 lg:h-80 bg-gradient-to-r from-orange-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          {/* Desktop-only decorative elements */}
          <div
            className="hidden lg:block absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-pink-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="hidden lg:block absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-300/10 to-teal-300/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column - Enhanced Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center mb-6 lg:mb-8">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-all duration-300 rounded-full px-4 py-2 font-medium text-sm mr-3 hover:scale-105">
                  ⭐ MÁS POPULAR
                </Badge>
                <div className="hidden lg:flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Descarga inmediata</span>
                </div>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal mb-6 lg:mb-8 text-gray-900 leading-tight">
                Jornal de{" "}
                <span className="relative text-orange-600 group">
                  21 Días
                  <div className="absolute -bottom-2 lg:-bottom-3 left-0 right-0 h-3 lg:h-4 bg-yellow-300 opacity-30 rounded-full transition-all duration-300 group-hover:opacity-50 group-hover:h-4 lg:group-hover:h-5"></div>
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transforma tu rutina familiar con reflexiones diarias, versículos bíblicos y actividades diseñadas para
                integrar fe y aprendizaje desde el primer día.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600 mb-8 lg:mb-10">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>Descarga inmediata</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Acceso de por vida</span>
                </div>
              </div>

              {/* Enhanced Price Display */}
              <div className="mb-8 lg:mb-10">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-orange-600">$29</div>
                  <div className="text-left">
                    <div className="text-lg lg:text-xl text-gray-600">USD</div>
                    <div className="text-sm text-gray-500">Pago único</div>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-sm text-gray-500 line-through mr-2">$49</span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Ahorra $20 - Oferta limitada
                  </span>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group min-h-[56px]"
                >
                  <BookOpen className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {isLoading ? "Procesando..." : "Comprar Ahora"}
                </Button>
                <Button
                  onClick={() => scrollToSection("incluye")}
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full text-lg px-8 py-4 font-medium bg-white/60 backdrop-blur-sm min-h-[56px] transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-gray-400 group"
                >
                  <ChevronDown className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Ver Detalles
                </Button>
              </div>
            </div>

            {/* Right Column - Enhanced Visual */}
            <div className="flex justify-center order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="relative">
                {/* Main Product Card */}
                <div className="w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[420px] lg:h-[32rem] bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-black/5"></div>
                  <BookOpen className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />

                  {/* Enhanced floating elements */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full animate-pulse flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div
                    className="absolute bottom-6 left-6 w-12 h-12 bg-white/15 rounded-full animate-pulse flex items-center justify-center"
                    style={{ animationDelay: "1s" }}
                  >
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div
                    className="absolute top-1/2 left-4 w-8 h-8 bg-white/10 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>

                {/* Desktop-only floating badges */}
                <div className="hidden lg:block absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  ¡Bestseller!
                </div>
                <div className="hidden lg:block absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                  PDF + Bonus
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section - Enhanced with Image */}
      <section id="incluye" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6 text-gray-900 leading-tight">
              Qué Incluye el{" "}
              <span className="relative text-orange-600 group">
                Jornal
                <div className="absolute -bottom-2 lg:-bottom-3 left-0 right-0 h-3 lg:h-4 bg-orange-200 opacity-50 rounded-full transition-all duration-300 group-hover:opacity-70 group-hover:h-4 lg:group-hover:h-5"></div>
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para transformar tu educación en casa
            </p>
          </div>

          <div className="grid gap-12 lg:gap-16 max-w-6xl mx-auto">
            {includedBlocks.map((block, blockIndex) => (
              <div key={blockIndex} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content (2 items) - Order changes based on index for alternating layout */}
                <div className={`space-y-8 ${blockIndex % 2 === 0 ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
                  {block.features.map((item, itemIndex) => {
                    const IconComponent = item.icon
                    return (
                      <div key={itemIndex} className="flex items-start group cursor-pointer">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:animate-wiggle" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Image - Order changes based on index for alternating layout */}
                <div
                  className={`flex justify-center ${blockIndex % 2 === 0 ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
                >
                  <div className="relative w-full max-w-md lg:max-w-none lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[350px] bg-white rounded-3xl shadow-xl overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=500&width=500&query=${encodeURIComponent(block.imageQuery)}`}
                      alt={block.imageQuery}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">¡Transforma tu hogar!</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Submission Section */}
      <section id="testimonios" className="py-20 sm:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6 text-gray-900 leading-tight">
              Lo que Dirás Después de la{" "}
              <span className="relative text-orange-600 group">
                Experiencia
                <div className="absolute -bottom-2 lg:-bottom-3 left-0 right-0 h-3 lg:h-4 bg-orange-200 opacity-50 rounded-full transition-all duration-300 group-hover:opacity-70 group-hover:h-4 lg:group-hover:h-5"></div>
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comparte tu testimonio y ayuda a otras familias
            </p>
          </div>

          <Card className="p-8 lg:p-10 bg-white shadow-lg rounded-3xl">
            <CardContent className="p-0">
              <h3 className="font-semibold text-xl lg:text-2xl text-gray-900 mb-6 text-center">Deja tu Reseña</h3>
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 lg:h-10 lg:w-10 cursor-pointer transition-colors duration-200 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                    }`}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Escribe tu experiencia aquí..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-base lg:text-lg min-h-[120px]"
              />
              <Button
                onClick={handleSubmitReview}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Enviar Reseña
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 lg:w-48 lg:h-48 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 lg:w-36 lg:h-36 bg-white/10 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="hidden lg:block absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full blur-md animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6 lg:mb-8 leading-tight">
            Comienza tu Transformación{" "}
            <span className="relative text-yellow-200 group">
              Hoy
              <div className="absolute -bottom-2 lg:-bottom-3 left-0 right-0 h-3 lg:h-4 bg-yellow-300/30 rounded-full transition-all duration-300 group-hover:bg-yellow-300/50 group-hover:h-4 lg:group-hover:h-5"></div>
            </span>
          </h2>

          <p className="text-xl lg:text-2xl mb-8 lg:mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto">
            Únete a las 500+ familias que ya han transformado su educación en casa con el Jornal de 21 Días.
          </p>

          {/* Enhanced Price Display */}
          <div className="mb-8 lg:mb-10">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="font-serif text-6xl lg:text-7xl font-normal">$29</div>
              <div className="text-left">
                <div className="text-xl lg:text-2xl">USD</div>
                <div className="text-sm lg:text-base text-white/80">Pago único</div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-lg text-white/70 line-through mr-3">$49</span>
              <span className="text-lg font-medium text-yellow-200 bg-yellow-500/20 px-3 py-1 rounded-full">
                Ahorra $20 - Oferta limitada
              </span>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100 text-xl px-10 py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group min-h-[64px]"
          >
            <BookOpen className="mr-2 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            {isLoading ? "Procesando..." : "Obtener el Jornal Ahora"}
          </Button>

          <p className="text-sm lg:text-base text-white/80 mt-4 lg:mt-6">
            Descarga inmediata • Garantía de 30 días • Acceso de por vida • Sin suscripciones
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 sm:hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif text-xl font-bold text-orange-600">$29 USD</div>
              <div className="text-xs text-gray-600">Jornal de 21 Días</div>
            </div>
            <Button
              onClick={handlePurchase}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 min-h-[48px]"
            >
              {isLoading ? "Procesando..." : "Comprar Ahora"}
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16 pb-20 sm:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/logo-obeliz.svg"
                  alt="obe&liz.co"
                  width={180}
                  height={50}
                  className="h-10 w-auto brightness-0 invert transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <p className="text-gray-400 mb-4 leading-relaxed max-w-md">
                Educación cristocéntrica en el hogar. Transformando familias a través de la fe y el aprendizaje.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("incluye")} className="hover:text-white transition-colors">
                    Qué Incluye
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("testimonios")} className="hover:text-white transition-colors">
                    Experiencia
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="text-sm">
              &copy; 2024 obe&liz.co - Educación cristocéntrica en el hogar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
