import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { parse, stringify } from 'qs';
import { EUnauthenticatedPath } from '../router/enums/unauthenticated-path.enum';

const handleAxiosRequest = (config: InternalAxiosRequestConfig) => {
  const item = localStorage.getItem('auth-token');
  const { token } = item ? JSON.parse(item) : '';

  config.headers.setAuthorization(token);

  return config;
};

function handleAxiosRequestError(error: AxiosError) {
  throw error;
}

function handleAxiosResponse(response: AxiosResponse<unknown, unknown>) {
  return response;
}

function goBackToLogin() {
  const to = '/' + EUnauthenticatedPath.LOGIN;
  window.location.href = to;
}

async function handleAxiosResponseError(error: AxiosError) {
  if (error?.response?.status === 502 || error?.code === 'ERR_NETWORK')
    throw new Error('Servidor indisponível!');

  const isUnauthenticatedPath = window.location.pathname
    .split('/')
    .some((path) =>
      Object.values(EUnauthenticatedPath).includes(
        path as EUnauthenticatedPath,
      ),
    );

  if (
    error.response?.status === 401 &&
    !isUnauthenticatedPath &&
    !error.config?.url?.includes('/auth') &&
    !error.config?.url?.includes('/files')
  ) {
    try {
      const item = localStorage.getItem('refresh-token');
      const { token } = item ? JSON.parse(item) : '';

      const response = await Client.post('/auth/refresh', {
        refreshToken: token,
      });

      localStorage.setItem(
        'auth-token',
        JSON.stringify({ token: response.data.token }),
      );
      localStorage.setItem(
        'refresh-token',
        JSON.stringify({ token: response.data.refreshToken }),
      );

      if (error.config) return Client(error.config);
      throw error;
    } catch {
      goBackToLogin();
      localStorage.removeItem('auth-token');
      localStorage.removeItem('refresh-token');

      throw new Error('Sem autorização!');
    }
  }

  throw error;
}

export const Client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  timeout: 900000,
  timeoutErrorMessage: 'Tempo limite, Tente novamente mais tarde.',
  paramsSerializer: {
    encode: (params) => parse(params),
    serialize: (params) => stringify(params),
  },
});

Client.interceptors.request.use(handleAxiosRequest, handleAxiosRequestError);

Client.interceptors.response.use(handleAxiosResponse, handleAxiosResponseError);
