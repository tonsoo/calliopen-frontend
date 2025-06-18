import CurratedPlaylist from "../../components/blocks/currated-playlist/CurratedPlaylist";
import NewReleases from "../../components/blocks/new-releases/NewReleases";
import TopCharts from "../../components/blocks/top-charts/TopCharts";
import SearchBar from "../../components/generics/inputs/search-bar/SearchBar";
import CurrentTrackerWrapper from "../../components/generics/wrappers/current-track-wrapper/CurrentTrackWrapper";
import ScrollableContent from "../../components/generics/wrappers/scrollable-content/ScrollableContent";
import SidebarWrapper from "../../components/generics/wrappers/sidebar-wrapper/SidebarWrapper";
import ContextMenu from "../../components/partials/context-menu/ContextMenu";
import { useContextMenu, type ContextMenuItem } from "../../providers/ContextMenuProvider";

export default function Dashboard() {
    const { showMenu } = useContextMenu();

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const customItems: ContextMenuItem[] = [
        {
            id: 'edit',
            label: 'Edit Item',
            onClick: () => alert('Edit clicked from MyComponent!'),
            icon: '✏️'
        },
        {
            id: 'delete',
            label: 'Delete Item',
            onClick: () => alert('Delete clicked from MyComponent!'),
            icon: '🗑️'
        },
        {
            id: 'separator-1',
            label: '---',
            onClick: () => {},
            disabled: true,
        },
        {
            id: 'specific',
            label: 'Component Specific Action',
            onClick: (data) => alert(`Action on item ID: ${data?.itemId}`),
            icon: '✨'
        },
        {
            id: 'disabled-example',
            label: 'Disabled Option',
            onClick: () => {},
            disabled: true,
            icon: '🚫'
        },
        ];

        const clickedData = { itemId: 'my-component-item-123', type: 'user-post' };

        showMenu(event.clientX, event.clientY, customItems, clickedData);
    };

    return (
        <CurrentTrackerWrapper>
            <ContextMenu />
            <div onContextMenu={handleRightClick} className="default-page page-dashboard">
                <SidebarWrapper>
                    <SearchBar className="mb-8" />
                    <ScrollableContent>
                        <div className="flex items-start justify-between gap-x-6 mb-11">
                            <CurratedPlaylist className="flex-grow" />
                            <TopCharts />
                        </div>
                        <NewReleases />
                    </ScrollableContent>
                </SidebarWrapper>
            </div>
        </CurrentTrackerWrapper>
    );
}