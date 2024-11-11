import { ISidebarItem } from '@/shared/layout/domain/interfaces/sidebar-item.interface';
import { IRoute } from '../interfaces/route.interface';

function toSidebarItems(route: IRoute): ISidebarItem {
  if (route.index || route.hidden) return {} as ISidebarItem;

  if (route.ability)
    return {
      icon: route.icon,
      name: route.name,
      path: '/' + route.path,
      ability: route.ability,
      children: [],
    } as ISidebarItem;

  return {
    name: route.name,
    path: '/' + route.path,
    icon: route.icon,
    ability: route.ability,
    children: route.children
      ?.map((children) => {
        if (children.index || children.hidden) return {} as ISidebarItem;

        return {
          name: children.name,
          path: `/${route.path}/${children.path}`,
          ability: children.ability,
        };
      })
      .filter((route) => !!route.name),
  } as ISidebarItem;
}

export function toSidebar(routes: Array<IRoute>): Array<ISidebarItem> {
  return routes
    .map((route) => toSidebarItems(route))
    .filter((item) => !!item.name);
}
