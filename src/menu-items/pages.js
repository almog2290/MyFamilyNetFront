// assets
import { IconLogin , IconListDetails } from '@tabler/icons-react';

// constant
const icons = {
  IconLogin,
  IconListDetails
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    { 
      id: 'login',
      title: 'Login',
      type: 'item',
      url: '/pages/login',
      icon: icons.IconLogin,
      breadcrumbs: false
    },
    {
      id: 'register',
      title: 'Register',
      type: 'item',
      url: '/pages/register',
      icon: icons.IconListDetails,
      breadcrumbs: false
    },
  ]
};

export default pages;
