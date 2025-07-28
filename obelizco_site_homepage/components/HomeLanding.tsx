"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, BookOpen, Users, Check, Play, Quote, Mail, Phone, MapPin, Menu, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function HomeLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-obeliz.svg"
              alt="obe&liz.co"
              width={200}
              height={60}
              className="h-8 sm:h-10 md:h-12 w-auto max-w-[160px] sm:max-w-[180px] md:max-w-[200px] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/testimonios"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              Testimonios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/shop"
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium relative group"
            >
              Tienda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <Button className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 sm:px-6 py-2 font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Comienza Hoy
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium py-2 hover:pl-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/about"
                className="block text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium py-2 hover:pl-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/blog"
                className="block text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium py-2 hover:pl-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/testimonios"
                className="block text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium py-2 hover:pl-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonios
              </Link>
              <Link
                href="/shop"
                className="block text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium py-2 hover:pl-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tienda
              </Link>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-medium mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Comienza Hoy
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 border border-orange-200 transition-all duration-300 hover:bg-white/80 hover:scale-105 hover:shadow-md">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Usado por +1,000 familias cristianas</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal mb-6 sm:mb-8 text-gray-900 leading-tight tracking-tight [text-wrap:balance]">
              Educa con{" "}
              <span className="relative group">
                <span className="text-orange-600 transition-colors duration-300 group-hover:text-orange-700">Fe</span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-yellow-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-yellow-300 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
              .
              <br />
              Cría con{" "}
              <span className="relative group">
                <span className="text-orange-600 transition-colors duration-300 group-hover:text-orange-700">
                  Intención
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-pink-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-pink-300 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
              .
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light [text-wrap:balance]">
              Transforma tu hogar en el centro del aprendizaje con currículos cristocéntricos que nutren el corazón, la
              mente y el espíritu de tus hijos.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-h-[48px] group"
              >
                <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                Ver Guía Gratuita
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-medium bg-white/60 backdrop-blur-sm min-h-[48px] transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-gray-400 group"
              >
                <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110" />
                Cómo Funciona
              </Button>
            </div>

            {/* Floating Elements - Hidden on mobile for cleaner look */}
            <div className="relative hidden sm:block">
              <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-60 blur-xl animate-pulse"></div>
              <div
                className="absolute -top-10 -right-32 w-24 h-24 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-40 blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-4 sm:mb-6 opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-110" />
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-6 sm:mb-8 leading-tight [text-wrap:balance] transition-all duration-300 hover:scale-105">
            "La verdadera educación es despertar el amor por la verdad y la belleza."
          </blockquote>
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 transition-all duration-300 hover:bg-white/30 hover:scale-105">
            <span className="text-xs sm:text-sm font-medium">— Filosofía obe&liz.co</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight [text-wrap:balance]">
              ¿Te sientes{" "}
              <span className="relative group">
                <span className="text-red-500 transition-colors duration-300 group-hover:text-red-600">abrumada</span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 sm:h-2 bg-red-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-red-300 group-hover:h-2 sm:group-hover:h-3"></div>
              </span>{" "}
              por educar en casa?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light [text-wrap:balance]">
              No estás sola. Miles de madres cristianas han encontrado paz y propósito con obe&liz.co.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
                    😰
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-red-600">
                  Burnout Maternal
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                  Te sientes agotada sin estructura clara ni apoyo espiritual.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
                    📚
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-blue-600">
                  Falta de Estructura
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                  No sabes por dónde empezar o cómo organizar el aprendizaje.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl sm:col-span-2 lg:col-span-1 hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
                    ⛪
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-orange-600">
                  Vacío Espiritual
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                  Quieres integrar la fe pero no encuentras recursos adecuados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight [text-wrap:balance]">
              Familias{" "}
              <span className="relative group">
                <span className="text-orange-600 transition-colors duration-300 group-hover:text-orange-700">
                  Transformadas
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-orange-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-orange-300 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light [text-wrap:balance]">
              Testimonios reales de madres que encontraron su camino
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-pink-50 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="flex mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-orange-400 text-orange-400 transition-all duration-300 hover:scale-125"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-800">
                  "El Jornal de 21 días cambió completamente nuestra rutina familiar. Ahora tenemos paz y dirección en
                  nuestro homeschool."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-white font-bold text-sm sm:text-base">MG</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base [text-wrap:balance] transition-colors duration-300 group-hover:text-orange-600">
                      María García
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 [text-wrap:balance]">Madre de 3, Colombia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="flex mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-orange-400 text-orange-400 transition-all duration-300 hover:scale-125"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-800">
                  "Finalmente encontré recursos que integran fe y educación de manera natural. Mis hijos aman aprender
                  así."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-white font-bold text-sm sm:text-base">AL</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base [text-wrap:balance] transition-colors duration-300 group-hover:text-blue-600">
                      Ana López
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 [text-wrap:balance]">Madre de 2, México</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl sm:col-span-2 lg:col-span-1 hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="flex mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-orange-400 text-orange-400 transition-all duration-300 hover:scale-125"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-800">
                  "La Guía de Cultura Familiar nos ayudó a definir nuestra visión educativa. Ahora educamos con
                  propósito claro."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-white font-bold text-sm sm:text-base">SM</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base [text-wrap:balance] transition-colors duration-300 group-hover:text-green-600">
                      Sofía Martínez
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 [text-wrap:balance]">Madre de 4, Argentina</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight [text-wrap:balance]">
              Qué Cambia en tu{" "}
              <span className="relative group">
                <span className="text-orange-600 transition-colors duration-300 group-hover:text-orange-700">Vida</span>
                <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-orange-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-orange-300 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light [text-wrap:balance]">
              Al usar obe&liz.co en tu educación en casa
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-lg">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-pink-600">
                Paz Interior
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Confianza en tu llamado como educadora cristiana
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-lg">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:h-10 text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-blue-600">
                Estructura Clara
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Rutinas y currículos organizados y fáciles de seguir
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-lg">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:h-10 text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-green-600">
                Comunidad
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Apoyo de otras familias en el mismo camino
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-lg">
                <Check className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-orange-600">
                Propósito
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Educación alineada con tus valores cristianos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight [text-wrap:balance]">
              Recursos{" "}
              <span className="relative group">
                <span className="text-orange-600 transition-colors duration-300 group-hover:text-orange-700">
                  Destacados
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-orange-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-orange-300 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light [text-wrap:balance]">
              Herramientas probadas para transformar tu homeschool
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl relative overflow-hidden hover:scale-105 hover:-translate-y-2 group">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <Badge className="bg-green-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs font-medium transition-all duration-300 group-hover:scale-110">
                  MÁS POPULAR
                </Badge>
              </div>
              <CardContent className="p-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-green-600">
                  Jornal de 21 Días
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                  Guía diaria con versículos, reflexiones y actividades para establecer rutinas espirituales.
                </p>
                <div className="font-serif text-2xl sm:text-3xl font-normal text-gray-900 mb-4 sm:mb-6 transition-colors duration-300 group-hover:text-green-600">
                  $29 USD
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-3 font-medium min-h-[48px] transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn">
                  <span className="transition-transform duration-300 group-hover/btn:scale-105">Comprar Ahora</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-blue-600">
                  Guía de Cultura Familiar
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                  Construye la visión espiritual y educativa de tu familia paso a paso.
                </p>
                <div className="font-serif text-2xl sm:text-3xl font-normal text-gray-900 mb-4 sm:mb-6 transition-colors duration-300 group-hover:text-blue-600">
                  $39 USD
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium min-h-[48px] transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn">
                  <span className="transition-transform duration-300 group-hover/btn:scale-105">Comprar Ahora</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl relative overflow-hidden sm:col-span-2 lg:col-span-1 hover:scale-105 hover:-translate-y-2 group">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <Badge className="bg-orange-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs font-medium transition-all duration-300 group-hover:scale-110">
                  PACK COMPLETO
                </Badge>
              </div>
              <CardContent className="p-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal mb-2 sm:mb-3 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-orange-600">
                  Pack Fundacional
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                  Jornal + Guía + Recursos adicionales. Todo lo que necesitas para empezar.
                </p>
                <div className="flex items-center mb-4 sm:mb-6">
                  <span className="font-serif text-base sm:text-lg text-gray-500 line-through mr-2 transition-colors duration-300 group-hover:text-gray-400">
                    $68
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                    $49 USD
                  </span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-medium min-h-[48px] transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn">
                  <span className="transition-transform duration-300 group-hover/btn:scale-105">Obtener Pack</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 leading-tight [text-wrap:balance]">
              Cómo{" "}
              <span className="relative group">
                <span className="text-blue-600 transition-colors duration-300 group-hover:text-blue-700">Funciona</span>
                <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-blue-200 -z-10 rounded-full transition-all duration-300 group-hover:bg-blue-300 group-hover:h-3 sm:group-hover:h-4"></div>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light [text-wrap:balance]">
              Un proceso simple para transformar tu educación en casa
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  1
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal mb-3 sm:mb-4 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-blue-600">
                Lee
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Comienza cada día con las reflexiones y versículos del Jornal para centrar tu corazón en Cristo.
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  2
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal mb-3 sm:mb-4 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-purple-600">
                Ora
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Dedica tiempo a la oración familiar usando las guías espirituales incluidas en cada recurso.
              </p>
            </div>

            <div className="text-center group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  3
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal mb-3 sm:mb-4 text-gray-900 [text-wrap:balance] transition-colors duration-300 group-hover:text-pink-600">
                Aplica
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance] transition-colors duration-300 group-hover:text-gray-700">
                Implementa las actividades y lecciones diseñadas para integrar fe y aprendizaje naturalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Extended blade style */}
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 md:px-12">
          <Card className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white border-0 shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
            <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/5"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
            <CardContent className="relative p-8 sm:p-12 md:p-16 text-center">
              <div className="max-w-[1100px] mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-4 sm:mb-6 leading-tight [text-wrap:balance] transition-transform duration-300 group-hover:scale-105">
                  Recibe{" "}
                  <span className="relative">
                    <span className="text-yellow-200 transition-colors duration-300 group-hover:text-yellow-100">
                      3 Días Gratis
                    </span>
                    <div className="absolute -bottom-1 left-0 right-0 h-1 sm:h-2 bg-yellow-300/30 -z-10 rounded-full transition-all duration-300 group-hover:bg-yellow-300/50"></div>
                  </span>{" "}
                  del Jornal
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 font-light leading-relaxed max-w-3xl mx-auto [text-wrap:balance] transition-colors duration-300 group-hover:text-white">
                  Únete a nuestra comunidad y descubre cómo integrar fe y educación desde el primer día.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto mb-4 sm:mb-6">
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border-white/30 rounded-full px-4 sm:px-6 py-3 h-12 text-sm sm:text-base transition-all duration-300 focus:bg-white/30 focus:border-white/50 focus:scale-105 focus:shadow-lg"
                  />
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 sm:px-8 py-3 font-medium whitespace-nowrap h-12 min-h-[48px] text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn">
                    <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                    <span className="transition-transform duration-300 group-hover/btn:scale-105">Obtener Gratis</span>
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-white/70 [text-wrap:balance] transition-colors duration-300 group-hover:text-white/80">
                  Sin spam. Solo inspiración y recursos valiosos para tu familia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer with Subtle Gradients */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 text-white py-16 sm:py-20 md:py-24 mt-16 sm:mt-20 md:mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div className="sm:col-span-2 lg:col-span-1">
                <Link href="/" className="inline-block mb-4 sm:mb-6 group">
                  <Image
                    src="/logo-obeliz.svg"
                    alt="obe&liz.co"
                    width={200}
                    height={60}
                    className="h-8 sm:h-10 md:h-12 w-auto max-w-[160px] sm:max-w-[180px] md:max-w-[200px] brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base [text-wrap:balance] transition-colors duration-300 hover:text-gray-200">
                  Educación cristocéntrica en el hogar. Transformando familias a través de la fe y el aprendizaje.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-normal mb-4 sm:mb-6 text-base sm:text-lg [text-wrap:balance] transition-colors duration-300 hover:text-orange-300">
                  Recursos
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  <li>
                    <Link href="/shop/jornal" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Jornal de 21 Días
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/guia" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Guía de Cultura
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/pack" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Pack Completo
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Blog Educativo
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif font-normal mb-4 sm:mb-6 text-base sm:text-lg [text-wrap:balance] transition-colors duration-300 hover:text-blue-300">
                  Comunidad
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  <li>
                    <Link href="/testimonios" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Testimonios
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-all duration-300 hover:pl-2">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif font-normal mb-4 sm:mb-6 text-base sm:text-lg [text-wrap:balance] transition-colors duration-300 hover:text-green-300">
                  Contacto
                </h3>
                <div className="space-y-2 sm:space-y-3 text-gray-300">
                  <div className="flex items-center group cursor-pointer">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                    <span className="text-xs sm:text-sm transition-colors duration-300 group-hover:text-white">
                      hola@obelizco.co
                    </span>
                  </div>
                  <div className="flex items-center group cursor-pointer">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                    <span className="text-xs sm:text-sm transition-colors duration-300 group-hover:text-white">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center group cursor-pointer">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                    <span className="text-xs sm:text-sm transition-colors duration-300 group-hover:text-white">
                      Latinoamérica
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 pt-6 sm:pt-8 text-center text-gray-400 transition-colors duration-300 hover:text-gray-300">
              <p className="text-xs sm:text-sm [text-wrap:balance]">
                &copy; 2024 obe&liz.co - Educación cristocéntrica en el hogar. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
