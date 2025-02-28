import React from 'react';
import MainLayout from './layouts/MainLayout';
import ServicePlanView from './components/service/ServicePlanView';
import { ThemeProvider } from './contexts/ThemeContext';
import { UIProvider } from './contexts/UIContext';
import RightPanel from './components/ui/RightPanel';

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <MainLayout>
          <ServicePlanView />
          <RightPanel />
        </MainLayout>
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;