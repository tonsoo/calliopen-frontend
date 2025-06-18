import "./App.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./providers/AudioProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="default-page">
      <QueryClientProvider client={queryClient}>
        <AudioProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AudioProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
