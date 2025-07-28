"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Check, BookOpen, ArrowLeft, X, Menu } from "lucide-react"
import { useState, useEffect } from "react"

export default function JornalLanding() {
  const [isLoading, setIsLoading] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Show sticky bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      setShowStickyBar(window.scrollY > heroHeight)
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

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Mobile-Optimized Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 lg:relative lg:bg-transparent lg:border-0">
        <div className="flex items-center justify-between px-4 py-3 lg:absolute lg:top-5 lg:left-5 lg:px-0 lg:py-0">
          <Link
            href="/"
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium text-sm lg:text-base">Volver a obe&liz.co</span>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#incluye"
                className="block text-gray-600 hover:text-gray-900 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Qué Incluye
              </a>
              <a
                href="#testimonios"
                className="block text-gray-600 hover:text-gray-900 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonios
              </a>
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
        )}
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 pt-4 pb-16 sm:pt-8 sm:pb-20 lg:py-32">
        {/* Floating Background Elements */}
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
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <Badge className="mb-4 sm:mb-6 bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-xs sm:text-sm">
                ⭐ MÁS POPULAR
              </Badge>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight">
                Jornal de{" "}
                <span className="relative text-orange-600 group">
                  21 Días
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-yellow-300 opacity-30 rounded-full transition-all duration-300 group-hover:opacity-50 group-hover:h-3 sm:group-hover:h-4"></div>
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
                Transforma tu rutina familiar con reflexiones diarias, versículos bíblicos y actividades diseñadas para
                integrar fe y aprendizaje desde el primer día.
              </p>

              {/* Rating - Mobile Optimized */}
              <div className="flex items-center justify-center lg:justify-start mb-6 sm:mb-8">
                <div className="flex mr-2 sm:mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 transition-transform duration-200 hover:scale-125"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium text-sm sm:text-base">4.9/5 • 500+ familias</span>
              </div>

              {/* Price - Mobile Optimized */}
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-orange-600 mb-6 sm:mb-8">
                $29 USD
              </div>

              {/* CTA Button - Mobile Optimized */}
              <Button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group min-h-[52px] sm:min-h-[56px]"
              >
                <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                {isLoading ? "Procesando..." : "Comprar Ahora"}
              </Button>
            </div>

            {/* Right Column - Visual - Mobile Optimized */}
            <div className="flex justify-center order-1 lg:order-2 mb-4 lg:mb-0">
              <div className="w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl flex items-center justify-center relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-black/5"></div>
                <BookOpen className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />

                {/* Floating elements inside the card */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 bg-white/15 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section - Mobile Optimized */}
      <section id="incluye" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight">
              Qué Incluye el{" "}
              <span className="relative text-orange-600 group">
                Jornal
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-orange-200 opacity-50 rounded-full transition-all duration-300 group-hover:opacity-70 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {[
              {
                title: "21 Reflexiones Diarias",
                description: "Meditaciones centradas en Cristo para comenzar cada día con propósito",
              },
              {
                title: "Versículos Temáticos",
                description: "Escrituras seleccionadas para fortalecer la fe familiar",
              },
              {
                title: "Actividades Prácticas",
                description: "Ejercicios para aplicar las enseñanzas en la vida diaria",
              },
              {
                title: "Preguntas de Reflexión",
                description: "Para profundizar en la aplicación personal y familiar",
              },
              {
                title: "Rutinas Espirituales",
                description: "Estructura para establecer hábitos cristianos duraderos",
              },
              {
                title: "Guía de Implementación",
                description: "Instrucciones paso a paso para usar el jornal efectivamente",
              },
              {
                title: "Formato PDF Imprimible",
                description: "Diseño hermoso y funcional para imprimir en casa",
              },
              {
                title: "Acceso de por Vida",
                description: "Descarga inmediata y acceso permanente al contenido",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start group cursor-pointer transition-transform duration-300 hover:translate-x-2 p-3 sm:p-4 rounded-xl hover:bg-gray-50"
              >
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-green-600">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Mobile Optimized */}
      <section id="testimonios" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight">
              Lo que Dicen las{" "}
              <span className="relative text-orange-600 group">
                Familias
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-orange-200 opacity-50 rounded-full transition-all duration-300 group-hover:opacity-70 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            <Card className="p-6 sm:p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl sm:rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="flex mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 transition-transform duration-200 hover:scale-125"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 italic leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                  "El Jornal transformó completamente nuestras mañanas. Ahora comenzamos cada día con Cristo en el
                  centro, y mis hijos han desarrollado un amor genuino por la Palabra de Dios."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3 sm:mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-sm sm:text-base">
                    MG
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                      María García
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">Madre de 3, Colombia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl sm:rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="flex mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 transition-transform duration-200 hover:scale-125"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 italic leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                  "Después de usar el Jornal por 21 días, establecimos rutinas que han perdurado por meses. Es increíble
                  cómo algo tan simple puede tener un impacto tan profundo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 sm:mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-sm sm:text-base">
                    AL
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                      Ana López
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">Madre de 2, México</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Mobile Optimized */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 leading-tight">
            Comienza tu Transformación{" "}
            <span className="relative text-yellow-200 group">
              Hoy
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-yellow-300/30 rounded-full transition-all duration-300 group-hover:bg-yellow-300/50 group-hover:h-3 sm:group-hover:h-4"></div>
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            Únete a las 500+ familias que ya han transformado su educación en casa con el Jornal de 21 Días.
          </p>

          <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 sm:mb-8">$29 USD</div>

          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group min-h-[52px] sm:min-h-[56px]"
          >
            <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
            {isLoading ? "Procesando..." : "Obtener el Jornal Ahora"}
          </Button>

          <p className="text-xs sm:text-sm text-white/80 mt-3 sm:mt-4 px-2 sm:px-0">
            Descarga inmediata • Garantía de 30 días • Acceso de por vida
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

      {/* Minimal Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 pb-20 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
            &copy; 2024 obe&liz.co - Educación cristocéntrica en el hogar. Todos los derechos reservados.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
              Términos de Uso
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
