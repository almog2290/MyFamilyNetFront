import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthRoutes from './AuthRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([AuthRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
