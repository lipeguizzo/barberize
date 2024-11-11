/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { RoleRepository } from '@/modules/role/repositories/role.repository';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';
import { ID } from '@/shared/types/id';
import { EAuthAction } from '../domain/enums/auth-action.enum';
import { IAuthAction } from '../domain/interfaces/auth-action.interface';
import { IAuthContextType } from '../domain/interfaces/auth-context-type.interface';
import { IAuth } from '../domain/interfaces/auth.interface';
import { AuthLoginData } from '../domain/schemas/auth-login.schema';
import { AuthRecoverData } from '../domain/schemas/auth-recover.schema';
import { AuthResetData } from '../domain/schemas/auth-reset.schema';
import { AuthRepository } from '../repositories/auth.repository';

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextType>(
  {} as IAuthContextType,
);

function authReducer(state: IAuth, action: IAuthAction) {
  const { type, user } = action;

  const states = {
    [EAuthAction.LOGIN]: {
      ...state,
      authenticated: true,
      user: user,
    },

    [EAuthAction.LOGOUT]: {
      ...state,
      authenticated: false,
      user: null,
    },
  };

  return states[type] as IAuth;
}

export function AuthProvider({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const authRepository = new AuthRepository();
  const roleRepository = new RoleRepository();

  const { setItem: setToken, removeItem: removeToken } = useLocalStorage(
    'auth-token',
    { token: '' },
  );

  const {
    getItem: getRefreshToken,
    setItem: setRefreshToken,
    removeItem: removeRefreshToken,
  } = useLocalStorage('refresh-token', { token: '' });

  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    user: null,
  } as IAuth);

  const [loading, setLoading] = useState<boolean>(true);

  const [abilities, setAbilities] = useState<AbilityEntity[] | null>(null);

  async function verifyAuthentication() {
    const isUnauthenticatedPath = Object.values(EUnauthenticatedPath).some(
      (path) => location.pathname.includes(path),
    );

    if (isUnauthenticatedPath) {
      setLoading(false);
      return;
    }

    if (state.authenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const {
        user,
        token,
        refreshToken: newRefreshToken,
      } = await authRepository.refreshToken(getRefreshToken().token);
      dispatch({ type: EAuthAction.LOGIN, user: state.user ?? user });

      setToken({ token: token });
      setRefreshToken({ token: newRefreshToken });

      navigate(location ?? '/');
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }

  async function findAbilities(id: ID) {
    const data = await roleRepository.findAbilities(id);
    setAbilities(data);
  }

  async function login(data: AuthLoginData) {
    try {
      setLoading(true);

      const { token, refreshToken, user } = await authRepository.login(data);

      dispatch({ type: EAuthAction.LOGIN, user });

      setToken({ token: token });
      setRefreshToken({ token: refreshToken });

      navigate(location ?? '/', {
        state: {
          origin: 'login',
          loggedIn: true,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    dispatch({ type: EAuthAction.LOGOUT });
    removeToken();
    removeRefreshToken();

    navigate(`/${EUnauthenticatedPath.LOGIN}`);

    setLoading(false);
  }

  async function recover(data: AuthRecoverData) {
    try {
      setLoading(true);

      const message = await authRepository.recover(data);

      return message;
    } finally {
      setLoading(false);
    }
  }

  async function reset(data: AuthResetData) {
    try {
      setLoading(true);

      const message = await authRepository.reset(data);

      return message;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyAuthentication();
  }, []);

  useEffect(() => {
    if (state.authenticated) setLoading(false);
  }, [state]);

  useEffect(() => {
    if (state.user?.role?.id) {
      findAbilities(state.user?.role?.id);
    }
  }, [state.user]);

  const value = useMemo(
    () => ({
      login,
      logout,
      recover,
      reset,
      loading,
      abilities,
      ...state,
    }),
    [loading, state, abilities],
  );

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
