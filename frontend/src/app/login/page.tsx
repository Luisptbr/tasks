import Link from "next/link";

// Página de redirecionamento - a tela de login agora é a página principal
export default function LoginRedirect() {
  return (
    // Container de redirecionamento com tema escuro
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Redirecionamento</h1>
        <p className="text-gray-300 mb-6">
          A tela de login agora é a página principal.
        </p>
        {/* Link para voltar à página principal (login) */}
        <Link 
          href="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors duration-200"
        >
          Ir para Login
        </Link>
      </div>
    </div>
  );
}
