import "./App.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./providers/AudioProvider";
import { ContextMenuProvider } from "./providers/ContextMenuProvider";
import ContextMenu from "./components/partials/context-menu/ContextMenu";
import { PopupProvider } from "./providers/PopupProvider";
import Popup from "./components/blocks/popup/Popup";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="default-app-page">
      <QueryClientProvider client={queryClient}>
        <ContextMenuProvider>
          <ContextMenu />
          <AudioProvider>
            <PopupProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
              <Popup />
            </PopupProvider>
          </AudioProvider>
        </ContextMenuProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App

export const queryKeys = {
  user: 'user',
  playlists: 'playlists',
  playlist: (uuid?:string) => `playlist-${uuid}`,
  favorites: 'favorites',
  albums: 'albums',
  album: (uuid?:string) => `album-${uuid}`,
  songs: 'songs',
  song: (uuid?:string) => `song-${uuid}`,
};