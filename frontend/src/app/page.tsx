"use client";
// Página principal - Tela de Login (primeira tela que o usuário vê)
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserLoginDTO, UserDTO } from "@/types";

// Componente da página principal - agora é a tela de login
export default function LoginPage() {
  const { login, register, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Estado para controlar se a modal de registro está aberta
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Estados para os formulários
  const [loginData, setLoginData] = useState<UserLoginDTO>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<UserDTO>({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Função que será executada quando o formulário de login for enviado
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(loginData);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  // Função que abre a modal de registro
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  // Função que fecha a modal de registro
  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // Efeito para fechar modal com a tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isRegisterModalOpen) {
        closeRegisterModal();
      }
    };

    // Adiciona listener quando modal está aberta
    if (isRegisterModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    // Remove listener ao desmontar ou fechar modal
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isRegisterModalOpen]);

  // Função que será executada quando o formulário de registro for enviado
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validar senhas
    if (registerData.password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (registerData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      const success = await register(registerData);
      if (success) {
        setSuccess("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => {
          closeRegisterModal();
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || "Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    // Container principal com layout responsivo e tema escuro
    <main className="min-h-screen flex flex-col md:flex-row relative bg-gray-900">
      {/* Lado esquerdo: IMAGEM - Seção visual da tela de login */}
      <div className="md:w-1/2 w-full h-64 md:h-auto bg-blue-700 flex items-center justify-center">
        <img
          src="/login-ilustration.png"
          alt="Login Illustration"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Lado direito: FORMULÁRIO - Seção de input do usuário */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-800">
        {/* Formulário de login com campos de email e senha */}
        <form
          onSubmit={handleLogin}
          className="bg-gray-700 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-600"
        >
          {/* Título do formulário */}
          <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
            Login
          </h2>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Campo de email */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-500 rounded bg-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
          </div>

          {/* Campo de senha */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1 font-medium">
              Senha
            </label>
            <input
              type="password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-500 rounded bg-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          {/* Checkbox para lembrar do login */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="text-gray-300 text-sm cursor-pointer"
            >
              Lembrar-me
            </label>
          </div>

          {/* Botão de envio do formulário - executa handleLogin ao ser clicado */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          {/* Botão para abrir modal de registro - chama openRegisterModal */}
          <button
            type="button"
            onClick={openRegisterModal}
            className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Criar nova conta
          </button>
        </form>
      </div>

      {/* Modal de registro - aparece quando isRegisterModalOpen é true */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl w-full max-w-sm border border-gray-600 max-h-[80vh] overflow-y-auto">
            {/* Cabeçalho da modal com botão de fechar */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100">
                Criar Nova Conta
              </h2>
              {/* Botão X para fechar modal - chama closeRegisterModal */}
              <button
                onClick={closeRegisterModal}
                className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Mensagens de feedback */}
            {error && (
              <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-600 bg-opacity-20 border border-green-500 rounded text-green-300 text-sm">
                {success}
              </div>
            )}

            {/* Formulário de registro com campos para novo usuário */}
            <form onSubmit={handleRegister} className="space-y-3">
              {/* Campo de nome completo */}
              <div>
                <label className="block text-gray-300 mb-1 font-medium">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-500 rounded bg-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu nome completo"
                />
              </div>

              {/* Campo de email */}
              <div>
                <label className="block text-gray-300 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-500 rounded bg-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu email"
                />
              </div>

              {/* Campo de senha */}
              <div>
                <label className="block text-gray-300 mb-1 font-medium">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-500 rounded bg-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite uma senha (mín. 6 caracteres)"
                />
              </div>

              {/* Campo de confirmação de senha */}
              <div>
                <label className="block text-gray-300 mb-1 font-medium">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-500 rounded bg-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirme sua senha"
                />
              </div>

              {/* Checkbox de aceitar termos */}
              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="text-gray-300 text-sm cursor-pointer"
                >
                  Eu aceito os{" "}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    termos de uso
                  </span>{" "}
                  e{" "}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    política de privacidade
                  </span>
                </label>
              </div>

              {/* Botões de ação */}
              <div className="flex space-x-3 pt-3">
                {/* Botão cancelar - fecha modal sem salvar */}
                <button
                  type="button"
                  onClick={closeRegisterModal}
                  disabled={isLoading}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-100 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                {/* Botão criar conta - executa handleRegister */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isLoading ? "Criando..." : "Criar Conta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
