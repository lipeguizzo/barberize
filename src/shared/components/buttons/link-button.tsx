import { Button, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props extends Omit<ButtonProps, 'component' & 'href'> {
  to: string;
}

export function LinkButton({
  children,
  to = '',
  size = 'large',
  variant = 'contained',
  ...props
}: Props) {
  return (
    <Button component={Link} to={to} size={size} variant={variant} {...props}>
      {children}
    </Button>
  );
}
