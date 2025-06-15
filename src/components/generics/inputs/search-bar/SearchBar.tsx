import { ReactSVG } from "react-svg";
import SearchIcon from '../../../../assets/icons/search-bar/search.svg';
import './SearchBar.scss';

interface SearchBarProps {
    className?: string;
}

export default function SearchBar({
    className = ""
} : SearchBarProps) {
    return (
        <div className={"app-search-bar " + className}>
            <ReactSVG className="icon has-icon aspect-square flex-shrink-0" src={SearchIcon} />
            <input className="input flex-grow" type="text" placeholder="Search" />
        </div>
    );
}