import type { Metadata } from "next";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// Metadados da aplicação - define título e descrição que aparecem no navegador
export const metadata: Metadata = {
  title: "Task Manager - Frontend",
  description: "Sistema de gerenciamento de tarefas com tema escuro",
};

// Componente de layout raiz - envolve todas as páginas da aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Define idioma e força tema escuro via classe 'dark'
    <html lang="pt-BR" className="dark">
      <body className="antialiased bg-gray-900 text-gray-100">
        {/* Provider de autenticação para toda a aplicação */}
        <AuthProvider>
          {/* Renderiza o conteúdo da página atual */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
