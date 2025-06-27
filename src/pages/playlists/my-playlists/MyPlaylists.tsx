import CollectionButton from "../../../components/generics/buttons/collection-button/CollectionButton";
import SearchBar from "../../../components/generics/inputs/search-bar/SearchBar";
import CurrentTrackerWrapper from "../../../components/generics/wrappers/current-track-wrapper/CurrentTrackWrapper";
import ScrollableContent from "../../../components/generics/wrappers/scrollable-content/ScrollableContent";
import SidebarWrapper from "../../../components/generics/wrappers/sidebar-wrapper/SidebarWrapper";
import ContextMenu from "../../../components/partials/context-menu/ContextMenu";
import './MyPlaylists.scss';
import PlaylistList from "../../../components/blocks/playlists/playlists-list/PlaylistList";
import { useState } from "react";
import FavoriteList from "../../../components/blocks/favorites/favorite-list/FavoriteList";

const pages = {
    collections: 'Collections',
    likes: 'Likes',
}

export default function MyPlaylists() {
    const [page, setPage] = useState(pages.collections);
    return (
        <CurrentTrackerWrapper>
            <ContextMenu />
            <div className="default-page page-my-playlists">
                <SidebarWrapper>
                    <SearchBar className="mb-8" />

                    <ScrollableContent className="mb-10 shrink-0" axis="horizontal" scrollBarVisible={false}>
                        <div className="app-collection-list">
                            <CollectionButton text="My collection" selected={page == pages.collections} onClick={() => setPage(pages.collections)} />
                            <CollectionButton text="Likes" selected={page == pages.likes} onClick={() => setPage(pages.likes)} />
                        </div>
                    </ScrollableContent>

                    {page == pages.collections && <PlaylistList />}
                    {page == pages.likes && <FavoriteList />}
                </SidebarWrapper>
            </div>
        </CurrentTrackerWrapper>
    );
}