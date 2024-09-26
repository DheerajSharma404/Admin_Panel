import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { Dashboard, Auth, Products, Users } from './pages/index';

const routes = [
  { path: '/', component: Dashboard, exact: true },
  { path: '/auth', component: Auth, exact: true },
  { path: '/products', component: Products, exact: true },
  { path: '/users', component: Users, exact: true },
];

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {routes.map((route, index) => (
        <Route 
          key={index} 
          path={route.path} 
          element={<route.component />} 
        />
      ))}
    </RouterRoutes>
  );
};

export default Routes;
