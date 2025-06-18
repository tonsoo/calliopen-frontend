import IconButton from "../../generics/buttons/icon-button/IconButton";
import RoundedWrapper from "../../generics/wrappers/rounded-wrapper/RoundedWrapper";
import Logo from "../../identity/logo/Logo";
import './Sidebar.scss';
import HomeIcon from '../../../assets/icons/sidebar/home.svg';
import LibraryIcon from '../../../assets/icons/sidebar/library.svg';
import RadioIcon from '../../../assets/icons/sidebar/radio.svg';
import VideosIcon from '../../../assets/icons/sidebar/videos.svg';
import UserIcon from '../../../assets/icons/sidebar/user.svg';
import ExitIcon from '../../../assets/icons/sidebar/exit.svg';
import { removeToken } from "../../../http/token";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../AppRoutes";
import ScrollableContent from "../../generics/wrappers/scrollable-content/ScrollableContent";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleTokenRemoval = () => {
        removeToken();
        navigate(routesList.login);
    };

    return (
        <div className="app-sidebar">
            <Logo className="mb-10" />
            
            <ScrollableContent scrollBarVisible={false}>
                <RoundedWrapper className="mb-5">
                    <IconButton src={HomeIcon} onClick={() => navigate(routesList.dashboard)} />
                    <IconButton src={LibraryIcon} />
                    <IconButton src={RadioIcon} />
                    <IconButton src={VideosIcon} />
                </RoundedWrapper>

                <RoundedWrapper>
                    <IconButton src={UserIcon} />
                    <IconButton src={ExitIcon} onClick={handleTokenRemoval} />
                </RoundedWrapper>
            </ScrollableContent>
        </div>
    );
}