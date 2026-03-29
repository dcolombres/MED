import TriageFlow from '@/components/triage/TriageFlow';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
          UMA Salud
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl">
          Tu salud no espera. Realiza tu triaje médico en segundos.
        </p>
      </div>

      <TriageFlow />

      <footer className="mt-20 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} UMA Salud. Todos los derechos reservados.
      </div>
    </main>
  );
}
