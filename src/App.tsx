import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayoutRedesigned from "./layouts/MainLayoutRedesigned";
import ServicePlanViewNative from "./components/service/ServicePlanViewNative";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./contexts/UIContext";
import RightPanel from "./components/ui/RightPanel";
import DesignSystemPage from "./pages/DesignSystemPage";
import BiblePageNative from "./pages/BiblePageNative";
import DisplaysPageNative from "./pages/DisplaysPageNative";
import WorshipPresenterPage from "./pages/WorshipPresenterPage";

// Create a separate component for Tempo routes
const TempoRoutes = () => {
  if (!import.meta.env.VITE_TEMPO) return null;

  // Import and use the routes from tempo-routes
  const RoutesComponent = React.lazy(() =>
    import("./tempo-routes").then((module) => ({
      default: () => {
        const Routes = module.default;
        return <Routes />;
      },
    })),
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RoutesComponent />
    </React.Suspense>
  );
};

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/bible" element={<BiblePageNative />} />
            <Route path="/displays" element={<DisplaysPageNative />} />
            <Route
              path="/service"
              element={
                <MainLayoutRedesigned>
                  <ServicePlanViewNative />
                </MainLayoutRedesigned>
              }
            />
            <Route path="/worship" element={<WorshipPresenterPage />} />
            <Route path="*" element={<HomePage />} />

            {/* Add this before any catchall route */}
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          </Routes>
        </BrowserRouter>
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
