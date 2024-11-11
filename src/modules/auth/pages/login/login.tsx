import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { LinkText } from '@/shared/components/buttons/link-text';
import { ControlledPassword } from '@/shared/components/inputs/controlled-password';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { UnauthenticatedContainerHeader } from '@/shared/layout/components/unauthenticated/container-header';
import { formatErrorForNotification } from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  AuthLoginData,
  AuthLoginSchema,
} from '../../domain/schemas/auth-login.schema';
import { useAuth } from '../../hooks/use-auth';
import { AuthLoginDto } from '../../domain/dto/auth-login.dto';

export function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<AuthLoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(AuthLoginSchema),
  });

  async function submit(data: AuthLoginData) {
    if (loading) return;
    try {
      setLoading(true);
      const dto: AuthLoginDto = data;
      await login(dto);
      toast.success('Bem vindo de volta!');
      reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <UnauthenticatedContainerHeader
        title="Entrar"
        description="Faça o login para ter a acesso ao sistema."
      />

      <Stack
        gap={2}
        width="100%"
        component="form"
        onSubmit={handleSubmit(submit)}
      >
        <ControlledText
          label="E-mail"
          name="email"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="E-mail"
        />

        <ControlledPassword
          label="Senha"
          name="password"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Senha"
        />

        <Button
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Enviar
        </Button>
      </Stack>

      <LinkText
        to={`/${EUnauthenticatedPath.REGISTER}`}
        align="center"
        color="secondary"
      >
        Não possui uma conta?
      </LinkText>

      <LinkText
        to={`/${EUnauthenticatedPath.RECOVER}`}
        align="center"
        color="secondary"
      >
        Esqueceu a senha?
      </LinkText>

      <SpinnerLoading loading={loading} />
    </>
  );
}
