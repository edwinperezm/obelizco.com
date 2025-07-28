export default function ContactPage() {
  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Nombre" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Correo" className="w-full p-2 border rounded" />
        <textarea placeholder="Mensaje" className="w-full p-2 border rounded h-32" />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Enviar</button>
      </form>
    </main>
  );
}
