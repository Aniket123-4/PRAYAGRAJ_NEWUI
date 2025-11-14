import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRoutes from "./routes/AppRoutes"; 
import { I18nextProvider } from 'react-i18next'; // Add this import
import i18n from './i18n'; // Import your i18n configuration

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <I18nextProvider i18n={i18n}> {/* Wrap with I18nextProvider */}
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes /> 
            </BrowserRouter>
          </I18nextProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;