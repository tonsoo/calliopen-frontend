import CurratedPlaylist from "../../components/blocks/currated-playlist/CurratedPlaylist";
import NewReleases from "../../components/blocks/new-releases/NewReleases";
import TopCharts from "../../components/blocks/top-charts/TopCharts";
import SearchBar from "../../components/generics/inputs/search-bar/SearchBar";
import CurrentTrackerWrapper from "../../components/generics/wrappers/current-track-wrapper/CurrentTrackWrapper";
import ScrollableContent from "../../components/generics/wrappers/scrollable-content/ScrollableContent";
import SidebarWrapper from "../../components/generics/wrappers/sidebar-wrapper/SidebarWrapper";

export default function Dashboard() {
    return (
        <CurrentTrackerWrapper>
            <div className="default-page page-dashboard">
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