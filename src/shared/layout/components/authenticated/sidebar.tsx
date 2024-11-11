import { toSidebar } from '@/infra/router/mappers/to-sidebar';
import { authenticatedRoutes } from '@/infra/router/routes/authenticated.route';
import { List, Stack } from '@mui/material';
import { AuthenticatedSidebarItem } from './sidebar-item';

export function AuthenticatedSidebar() {
  const items = toSidebar(authenticatedRoutes);

  return (
    <Stack
      sx={{
        width: '100px',
        height: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '20px',
        padding: '5px',
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {items.map((item) => (
          <AuthenticatedSidebarItem key={item.name} item={item} />
        ))}
      </List>
    </Stack>
  );
}
