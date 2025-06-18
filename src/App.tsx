import "./App.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./providers/AudioProvider";
import { ContextMenuProvider } from "./providers/ContextMenuProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="default-app-page">
      <QueryClientProvider client={queryClient}>
        <ContextMenuProvider>
          <AudioProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AudioProvider>
        </ContextMenuProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
