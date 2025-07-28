export default function ShopPage() {
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Tienda OBELIS</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Jornal de 21 Días</h2>
          <p className="mb-2">Guía PDF para padres con versículos y reflexiones.</p>
          <button className="bg-black text-white px-4 py-2 rounded">Comprar</button>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Guía de Cultura Familiar</h2>
          <p className="mb-2">Construye tu visión espiritual y educativa.</p>
          <button className="bg-black text-white px-4 py-2 rounded">Comprar</button>
        </div>
      </div>
    </main>
  );
}
