import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Familias <span className="text-amber-900">Transformadas</span>
          </h1>
          <p className="text-xl text-gray-700">
            Testimonios reales de madres que encontraron paz y propósito en su educación en casa
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-6 border-l-4 border-l-amber-900">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "El Jornal de 21 días cambió completamente nuestra rutina familiar. Ahora tenemos paz y dirección en
                  nuestro homeschool. Mis hijos esperan con ansias nuestro tiempo de reflexión matutina."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">MG</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">María García</p>
                    <p className="text-sm text-gray-600">Madre de 3 hijos • Bogotá, Colombia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6 border-l-4 border-l-amber-900">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Finalmente encontré recursos que integran fe y educación de manera natural. Mis hijos aman aprender
                  así y yo me siento confiada en mi llamado como educadora."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana López</p>
                    <p className="text-sm text-gray-600">Madre de 2 hijos • Ciudad de México, México</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6 border-l-4 border-l-amber-900">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "La Guía de Cultura Familiar nos ayudó a definir nuestra visión educativa. Ahora educamos con
                  propósito claro y nuestros hijos entienden el 'por qué' detrás de todo."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sofía Martínez</p>
                    <p className="text-sm text-gray-600">Madre de 4 hijos • Buenos Aires, Argentina</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 4 */}
            <Card className="p-6 border-l-4 border-l-amber-900">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Estaba completamente abrumada hasta que encontré OBELIS. El Pack Fundacional me dio toda la
                  estructura que necesitaba para empezar con confianza."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">LR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lucía Rodríguez</p>
                    <p className="text-sm text-gray-600">Madre de 1 hijo • Lima, Perú</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 5 */}
            <Card className="p-6 border-l-4 border-l-amber-900">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Los recursos de OBELIS transformaron no solo nuestra educación, sino toda nuestra dinámica familiar.
                  Ahora Cristo está en el centro de todo lo que hacemos."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">CV</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Carmen Vásquez</p>
                    <p className="text-sm text-gray-600">Madre de 3 hijos • Santiago, Chile</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 6 */}
            <Card className="p-6 border-l-4 border-l-amber-900">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Después de años de burnout, OBELIS me devolvió la pasión por educar a mis hijos. Ahora disfruto cada
                  día de aprendizaje en familia."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-900 font-semibold">PT</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Patricia Torres</p>
                    <p className="text-sm text-gray-600">Madre de 2 hijos • Quito, Ecuador</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-900 mb-2">1,000+</div>
              <p className="text-gray-700">Familias Transformadas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-900 mb-2">15</div>
              <p className="text-gray-700">Países Alcanzados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-900 mb-2">98%</div>
              <p className="text-gray-700">Satisfacción</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-900 mb-2">3</div>
              <p className="text-gray-700">Años de Experiencia</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
