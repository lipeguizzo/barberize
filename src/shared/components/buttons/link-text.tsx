import { Link as MuiLink, LinkProps } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props extends Omit<LinkProps, 'component' & 'href'> {
  to: string;
}

export function LinkText({
  children,
  to = '',
  underline = 'hover',
  ...props
}: Props) {
  return (
    <MuiLink component={Link} to={to} underline={underline} {...props}>
      {children}
    </MuiLink>
  );
}
