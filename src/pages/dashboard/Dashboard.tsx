import CurratedPlaylist from "../../components/blocks/currated-playlist/CurratedPlaylist";
import NewReleases from "../../components/blocks/new-releases/NewReleases";
import TopCharts from "../../components/blocks/top-charts/TopCharts";
import SearchBar from "../../components/generics/inputs/search-bar/SearchBar";
import Sidebar from "../../components/partials/sidebar/Sidebar";
import './Dashboard.scss';

export default function Dashboard() {
    return (
        <div className="page-dashboard">
            <Sidebar />
            <div className="flex-grow">
                <SearchBar className="mb-8" />
                <div className="flex items-start justify-between gap-x-6 mb-11">
                    <CurratedPlaylist className="flex-grow" />
                    <TopCharts />
                </div>
                <NewReleases />
            </div>
        </div>
    );
}