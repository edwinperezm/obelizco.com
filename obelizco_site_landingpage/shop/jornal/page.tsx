import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, BookOpen, Star } from "lucide-react"

export default function JornalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">MÁS POPULAR</Badge>
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Jornal de <span className="text-amber-900">21 Días</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Transforma tu rutina familiar con reflexiones diarias, versículos bíblicos y actividades diseñadas para
                integrar fe y aprendizaje desde el primer día.
              </p>
              <div className="flex items-center mb-8">
                <div className="flex mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600">4.9/5 • 500+ familias</span>
              </div>
              <div className="text-4xl font-bold text-amber-900 mb-6">$29 USD</div>
              <Button size="lg" className="bg-amber-900 hover:bg-amber-800 text-lg px-8 py-4">
                <BookOpen className="mr-2 h-5 w-5" />
                Comprar Ahora
              </Button>
            </div>
            <div className="bg-amber-100 h-96 rounded-lg flex items-center justify-center">
              <BookOpen className="h-32 w-32 text-amber-900" />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Qué Incluye el <span className="text-amber-900">Jornal</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">21 Reflexiones Diarias</h3>
                  <p className="text-gray-600">Meditaciones centradas en Cristo para comenzar cada día con propósito</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Versículos Temáticos</h3>
                  <p className="text-gray-600">Escrituras seleccionadas para fortalecer la fe familiar</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Actividades Prácticas</h3>
                  <p className="text-gray-600">Ejercicios para aplicar las enseñanzas en la vida diaria</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Preguntas de Reflexión</h3>
                  <p className="text-gray-600">Para profundizar en la aplicación personal y familiar</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Rutinas Espirituales</h3>
                  <p className="text-gray-600">Estructura para establecer hábitos cristianos duraderos</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Guía de Implementación</h3>
                  <p className="text-gray-600">Instrucciones paso a paso para usar el jornal efectivamente</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Formato PDF Imprimible</h3>
                  <p className="text-gray-600">Diseño hermoso y funcional para imprimir en casa</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Acceso de por Vida</h3>
                  <p className="text-gray-600">Descarga inmediata y acceso permanente al contenido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Lo que Dicen las <span className="text-amber-900">Familias</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "El Jornal transformó completamente nuestras mañanas. Ahora comenzamos cada día con Cristo en el
                  centro, y mis hijos han desarrollado un amor genuino por la Palabra de Dios."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">MG</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">María García</p>
                    <p className="text-sm text-gray-600">Madre de 3, Colombia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Después de usar el Jornal por 21 días, establecimos rutinas que han perdurado por meses. Es increíble
                  cómo algo tan simple puede tener un impacto tan profundo."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana López</p>
                    <p className="text-sm text-gray-600">Madre de 2, México</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Comienza tu Transformación <span className="text-amber-200">Hoy</span>
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Únete a las 500+ familias que ya han transformado su educación en casa con el Jornal de 21 Días.
          </p>
          <div className="text-5xl font-bold mb-6">$29 USD</div>
          <Button size="lg" className="bg-amber-700 hover:bg-amber-600 text-lg px-12 py-4">
            <BookOpen className="mr-2 h-6 w-6" />
            Obtener el Jornal Ahora
          </Button>
          <p className="text-sm text-amber-200 mt-4">Descarga inmediata • Garantía de 30 días • Acceso de por vida</p>
        </div>
      </section>
    </main>
  )
}
