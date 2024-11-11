import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { LinkText } from '@/shared/components/buttons/link-text';
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
  AuthRecoverData,
  AuthRecoverSchema,
} from '../../domain/schemas/auth-recover.schema';
import { useAuth } from '../../hooks/use-auth';
import { AuthRecoverPasswordDto } from '../../domain/dto/auth-recover-password.dto';

export function Recover() {
  const { recover } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<AuthRecoverData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(AuthRecoverSchema),
  });

  async function submit(data: AuthRecoverData) {
    if (loading) return;

    try {
      setLoading(true);
      const dto: AuthRecoverPasswordDto = data;
      const { message } = await recover(dto);
      toast.success(message);
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
        title="Recuperar Senha"
        description="Informe o e-mail da sua conta para alterar a senha."
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
        to={`/${EUnauthenticatedPath.LOGIN}`}
        align="center"
        color="secondary"
      >
        Já possui uma conta?
      </LinkText>

      <SpinnerLoading loading={loading} />
    </>
  );
}
