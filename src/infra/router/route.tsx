import { Authenticated } from '@/shared/layout/pages/authenticated';
import { Unauthenticated } from '@/shared/layout/pages/unauthenticated';
import { Navigate, useRoutes } from 'react-router-dom';
import { toRouter } from './mappers/to-router';
import { authenticatedRoutes } from './routes/authenticated.route';
import { unauthenticatedRoutes } from './routes/unauthenticated.route';
import { RequiredAuth } from './components/required-auth';

export function Router() {
  return useRoutes([
    {
      element: <Unauthenticated />,
      children: [...toRouter(unauthenticatedRoutes)],
    },
    {
      element: <RequiredAuth />,
      children: [
        {
          element: <Authenticated />,
          children: [
            {
              path: '*',
              element: <Navigate to="/" />,
            },
            ...toRouter(authenticatedRoutes),
          ],
        },
      ],
    },
  ]);
}
