import type DefaultProps from "../../../../../traits/DefaultProps";
import { useContextMenu, type ContextMenuItem } from "../../../../../providers/ContextMenuProvider";
import { getUser } from "../../../../../http/token";
import { usePopup } from "../../../../../providers/PopupProvider";
import SelectPlaylist from "../../../../blocks/popup/popups/select-playlist/SelectPlaylist";
import type { Playlist, Song } from "../../../../../api";
import type { ReactNode } from "react";
import AddSongSvg from '../../../../../assets/icons/actions/add-song.svg';
import PlaylistService from "../../../../../http/services/playlist-services";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../App";

interface SongContextWrapperProps extends DefaultProps {
    children?: ReactNode;
    song: Song;
}

export default function SongContextWrapper({
    children, className = "", song,
} : SongContextWrapperProps) {
    const queryClient = useQueryClient();
    const { showMenu } = useContextMenu();
    const { openPopup } = usePopup();
    const userUuid = getUser()?.uuid;

    const handlePlaylistSelection = async (playlist: Playlist) => {
        await new PlaylistService().addSong(userUuid!, playlist.uuid!, song.uuid!);
        queryClient.invalidateQueries({ queryKey: [queryKeys.playlist(playlist.uuid)] });
    };

    const handleRightClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const customItems: ContextMenuItem[] = [
            {
                id: 'add-to-playlist',
                label: 'Add to my playlist',
                icon: AddSongSvg,
                onClick: () => openPopup(SelectPlaylist, { "userUuid": userUuid!, "onSelect": handlePlaylistSelection }),
            }
        ];

        showMenu(event.clientX, event.clientY, customItems);
    };

    return (
        <div onContextMenu={handleRightClick} className={"app-song-context-wrapper " + className}>
            {children}
        </div>
    );
}