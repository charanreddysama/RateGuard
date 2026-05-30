import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundOrbs from "./components/layout/BackgroundOrbs";
import HomePage from "./pages/landing/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/dashboard/ProjectsPage";
import RulesPage from "./pages/dashboard/RulesPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProjectDetailsPage from "./pages/dashboard/ProjectDetailsPage";
import ApiKeysPage from "./pages/dashboard/ApiKeysPage";
import DocsPage from "./pages/dashboard/DocsPage";
import PlaygroundPage from "./pages/dashboard/PlaygroundPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

// ==========================================
// APP ROUTER (The map of our website)
// This file acts as a traffic cop. Depending on the URL the user types in,
// it directs them to the correct page component.
// ==========================================

function App() {
  return (
    // BrowserRouter enables navigating between pages without reloading the whole browser window
    <BrowserRouter>
      {/* BackgroundOrbs are the floating glowing circles you see behind the UI on every page */}
      <BackgroundOrbs />
      
      {/* Routes holds all of the available paths (URLs) in our application */}
      <Routes>
        {/* PUBLIC PAGES (Anyone can visit these) */}
        {/* If the user is at the root URL "/", show them the HomePage component */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* PROTECTED DASHBOARD PAGES (Usually require the user to be logged in) */}
        {/* /dashboard shows the main overview metrics */}
        <Route path="/dashboard" element={<DashboardHome />} />
        
        {/* /dashboard/projects lists all the API projects they've created */}
        <Route path="/dashboard/projects" element={<ProjectsPage />} />
        
        {/* The :projectId part is dynamic. E.g. /dashboard/projects/12345 will show project 12345 */}
        <Route path="/dashboard/projects/:projectId" element={<ProjectDetailsPage />} />
        
        {/* Other dashboard tools */}
        <Route path="/dashboard/rules" element={<RulesPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/api-keys" element={<ApiKeysPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        
        {/* DEVELOPER TOOLS */}
        <Route path="/dashboard/docs" element={<DocsPage />} />
        <Route path="/dashboard/playground" element={<PlaygroundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;