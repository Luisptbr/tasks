import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que requerem autenticação
const protectedRoutes = ['/dashboard'];

// Rotas que só devem ser acessadas por usuários NÃO autenticados
const publicRoutes = ['/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verifica se há um usuário no localStorage (simulado pelo cookie ou header)
  const userCookie = request.cookies.get('user')?.value;
  const isAuthenticated = !!userCookie;

  // Se tentar acessar uma rota protegida sem estar autenticado
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    // Redireciona para a página de login
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se tentar acessar uma rota pública estando autenticado
  if (publicRoutes.includes(pathname) && isAuthenticated) {
    // Redireciona para o dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
