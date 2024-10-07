import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { Dashboard, Auth, Products, Users, Welcome, TaskManagerDashboard, Tasks, UserProfile, UserCalender, TaskDetails, AddProducts, ProductTable, AllJobs, CreateJob, ViewApplications } from './pages/index';
import MainLayout from './layout/MainLayout';
import TaskStatistics from './pages/TasksStaistics';
const routes = [
  { path: '/', component: <Welcome />, exact: true },
  { path: '/dashboard', component: <Dashboard />, exact: true },
  { path: '/auth', component: <Auth />, exact: true },
  { path: '/products', component: <MainLayout><Products /></MainLayout>, exact: true },
  { path: '/users', component: <MainLayout><Users /></MainLayout>, exact: true },
  { path: '/taskDashboard', component: <MainLayout><TaskManagerDashboard /></MainLayout>, exact: true },
  { path: '/tasks', component: <MainLayout><Tasks /></MainLayout>, exact: true },
  { path: '/UserProfile', component: <MainLayout><UserProfile/></MainLayout>, exact: true },
  { path: '/taskStatistics', component: <MainLayout><TaskStatistics/></MainLayout>, exact: true },
  { path: '/calender', component: <MainLayout><UserCalender/></MainLayout>, exact: true },
  { path: '/taskDetails/:taskId', component: <MainLayout><TaskDetails/></MainLayout>, exact: true },
  { path: '/task/:taskId', component: <MainLayout><TaskDetails/></MainLayout>, exact: true },
  { path: '/add-products', component: <MainLayout><AddProducts/></MainLayout>, exact: true },
  { path: '/product-table', component: <MainLayout><ProductTable/></MainLayout>, exact: true },
  { path: '/all-jobs', component: <MainLayout><AllJobs/></MainLayout>, exact: true },
  { path: '/hiring-form', component: <MainLayout><CreateJob/></MainLayout>, exact: true },
  { path: '/view-applications', component: <MainLayout><ViewApplications/></MainLayout>, exact: true },
];

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {routes.map((route, index) => (
        <Route 
          key={index} 
          path={route.path} 
          element={route.component} 
        />
      ))}
    </RouterRoutes>
    
  );
};

export default Routes;
