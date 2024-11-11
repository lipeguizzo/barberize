import { Login } from '@/modules/auth/pages/login/login';
import { EUnauthenticatedPath } from '../enums/unauthenticated-path.enum';
import { IRoute } from '../interfaces/route.interface';
import { Recover } from '@/modules/auth/pages/recover/recover';
import { Reset } from '@/modules/auth/pages/reset/reset';
import { Register } from '@/modules/auth/pages/register/register';

export const unauthenticatedRoutes: IRoute[] = [
  {
    name: 'Entrar',
    element: <Login />,
    path: EUnauthenticatedPath.LOGIN,
  },

  {
    name: 'Cadastro',
    element: <Register />,
    path: EUnauthenticatedPath.REGISTER,
  },

  {
    name: 'Recuperar Senha',
    element: <Recover />,
    path: EUnauthenticatedPath.RECOVER,
  },

  {
    name: 'Alterar Senha',
    element: <Reset />,
    path: EUnauthenticatedPath.RESET,
  },
];
