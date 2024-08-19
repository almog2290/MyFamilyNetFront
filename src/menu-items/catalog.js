// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const catalog = {
  id: 'catalog',
  title: 'Catalog',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default catalog;
