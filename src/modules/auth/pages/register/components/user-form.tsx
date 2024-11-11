import {
  EGender,
  EGenderTranslate,
} from '@/modules/user/domain/enums/gender.enum';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import { ControlledPassword } from '@/shared/components/inputs/controlled-password';
import { ControlledPhone } from '@/shared/components/inputs/controlled-phone';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';

export function UserForm() {
  const { control } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledEnum
          options={EGender}
          translate={EGenderTranslate}
          label="Gênero"
          name="gender"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="E-mail"
          name="email"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="E-mail"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledPhone
          label="Telefone"
          name="phone"
          size="medium"
          control={control}
          placeholder="Telefone"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledPassword
          label="Senha"
          name="password"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Senha"
        />
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledPassword
          label="Confirme a senha"
          name="confirm"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Confirme a senha"
        />
      </Grid>
    </Grid>
  );
}
