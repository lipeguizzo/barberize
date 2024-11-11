import { CompanyCreate } from '@/modules/company/pages/create/company-create';
import { CompanyList } from '@/modules/company/pages/list/company-list';
import { CompanyUpdate } from '@/modules/company/pages/update/company-update';
import { HaircutCreate } from '@/modules/haircut/pages/create/haircut-create';
import { HaircutList } from '@/modules/haircut/pages/list/haircut-list';
import { HaircutUpdate } from '@/modules/haircut/pages/update/haircut-update';
import { HistoryList } from '@/modules/history/pages/list/history-list';
import { HolidayCreate } from '@/modules/holiday/pages/create/holiday-create';
import { HolidayList } from '@/modules/holiday/pages/list/holiday-list';
import { HolidayUpdate } from '@/modules/holiday/pages/update/holiday-update';
import { HomeCompanies } from '@/modules/home/pages/home-companies/home-companies';
import { HomeScheduling } from '@/modules/home/pages/home-scheduling/home-scheduling';
import { HoraryCreate } from '@/modules/horary/pages/create/horary-create';
import { HoraryList } from '@/modules/horary/pages/list/horary-list';
import { HoraryUpdate } from '@/modules/horary/pages/update/horary-update';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { RoleCreate } from '@/modules/role/pages/create/role-create';
import { RoleList } from '@/modules/role/pages/list/role-list';
import { RoleUpdate } from '@/modules/role/pages/update/role-update';
import { SchedulingList } from '@/modules/scheduling/pages/list/scheduling-list';
import { UserCreate } from '@/modules/user/pages/create/user-create';
import { UserList } from '@/modules/user/pages/list/user-list';
import { UserSettings } from '@/modules/user/pages/settings/user-settings';
import { UserUpdate } from '@/modules/user/pages/update/user-update';
import { WorkingDayList } from '@/modules/working-day/pages/list/working-day-list';
import { WorkingDayUpdate } from '@/modules/working-day/pages/update/working-day-update';
import AccessTime from '@mui/icons-material/AccessTime';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import Business from '@mui/icons-material/Business';
import Celebration from '@mui/icons-material/Celebration';
import ContentCut from '@mui/icons-material/ContentCut';
import EditCalendar from '@mui/icons-material/EditCalendar';
import House from '@mui/icons-material/House';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import Today from '@mui/icons-material/Today';
import { Outlet } from 'react-router-dom';
import { RequiredAbility } from '../components/required-ability';
import { EAuthenticatedPath } from '../enums/authenticated-path.enum';
import { IRoute } from '../interfaces/route.interface';
import { AssessmentList } from '@/modules/assessment/pages/list/assessment-list';

export const authenticatedRoutes: IRoute[] = [
  {
    name: 'Pagina principal',
    element: <Outlet />,
    path: EAuthenticatedPath.HOME,
    icon: <House sx={{ fontSize: '40px' }} />,
    children: [
      {
        index: true,
        element: <HomeCompanies />,
      },
      {
        name: 'Pagina principal agendamento',
        path: 'agendamento',
        element: <HomeScheduling />,
      },
    ],
  },
  {
    name: 'Configurações',
    element: <UserSettings />,
    path: EAuthenticatedPath.SETTINGS,
    hidden: true,
  },
  {
    name: 'Usuários',
    path: EAuthenticatedPath.USERS,
    ability: EAbilityCode.USERS,
    icon: <PeopleAlt sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.USERS} />,
    children: [
      {
        index: true,
        element: <UserList />,
      },
      {
        name: 'Novo usuário',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.USERS}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <UserCreate />,
          },
        ],
      },
      {
        name: 'Edição de usuário',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.USERS}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <UserUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Empresas',
    path: EAuthenticatedPath.COMPANIES,
    ability: EAbilityCode.COMPANIES,
    icon: <Business sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.COMPANIES} />,
    children: [
      {
        index: true,
        element: <CompanyList />,
      },
      {
        name: 'Nova empresa',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.COMPANIES}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <CompanyCreate />,
          },
        ],
      },
      {
        name: 'Edição de empresa',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.COMPANIES}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <CompanyUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Perfis de usuários',
    path: EAuthenticatedPath.ROLES,
    ability: EAbilityCode.ROLES,
    icon: <AdminPanelSettings sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.ROLES} />,
    children: [
      {
        index: true,
        element: <RoleList />,
      },
      {
        name: 'Novo perfil',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.ROLES}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <RoleCreate />,
          },
        ],
      },
      {
        name: 'Edição de perfil',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.ROLES}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <RoleUpdate />,
          },
        ],
      },
    ],
  },

  {
    name: 'Cortes',
    path: EAuthenticatedPath.HAIRCUTS,
    ability: EAbilityCode.HAIRCUTS,
    icon: <ContentCut sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.HAIRCUTS} />,
    children: [
      {
        index: true,
        element: <HaircutList />,
      },
      {
        name: 'Novo corte',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.HAIRCUTS}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <HaircutCreate />,
          },
        ],
      },
      {
        name: 'Edição de corte',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.HAIRCUTS}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <HaircutUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Horários',
    path: EAuthenticatedPath.HOURS,
    ability: EAbilityCode.HOURS,
    icon: <AccessTime sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.HOURS} />,
    children: [
      {
        index: true,
        element: <HoraryList />,
      },
      {
        name: 'Novo horário',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.HOURS}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <HoraryCreate />,
          },
        ],
      },
      {
        name: 'Edição de horário',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.HOURS}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <HoraryUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Dias de Trabalho',
    path: EAuthenticatedPath.WORKING_DAYS,
    ability: EAbilityCode.WORKING_DAYS,
    icon: <EditCalendar sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.WORKING_DAYS} />,
    children: [
      {
        index: true,
        element: <WorkingDayList />,
      },

      {
        name: 'Edição de dia de trabalho',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.WORKING_DAYS}
            action={EAbilityAction.UPDATE}
          />
        ),
        children: [
          {
            index: true,
            element: <WorkingDayUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Feriados',
    path: EAuthenticatedPath.HOLIDAYS,
    ability: EAbilityCode.HOLIDAYS,
    icon: <Celebration sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.HOLIDAYS} />,
    children: [
      {
        index: true,
        element: <HolidayList />,
      },
      {
        name: 'Novo feriado',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.HOLIDAYS}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <HolidayCreate />,
          },
        ],
      },
      {
        name: 'Edição de feriado',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.HOLIDAYS}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <HolidayUpdate />,
          },
        ],
      },
    ],
  },

  {
    name: 'Agendamentos',
    path: EAuthenticatedPath.SCHEDULINGS,
    ability: EAbilityCode.SCHEDULINGS,
    icon: <Today sx={{ fontSize: '40px' }} />,
    element: <RequiredAbility code={EAbilityCode.SCHEDULINGS} />,
    children: [
      {
        index: true,
        element: <SchedulingList />,
      },
    ],
  },

  {
    name: 'Históricos',
    path: EAuthenticatedPath.HISTORIES,
    hidden: true,
    ability: EAbilityCode.HISTORIES,
    element: <RequiredAbility code={EAbilityCode.HISTORIES} />,
    children: [
      {
        index: true,
        element: <HistoryList />,
      },
    ],
  },

  {
    name: 'Avaliações',
    path: EAuthenticatedPath.ASSESSMENTS,
    hidden: true,
    ability: EAbilityCode.ASSESSMENTS,
    element: <RequiredAbility code={EAbilityCode.ASSESSMENTS} />,
    children: [
      {
        index: true,
        element: <AssessmentList />,
      },
    ],
  },
];
