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
        queryClient.invalidateQueries({ queryKey: ['load-playlists', `load-playlist-${playlist.uuid}`] });
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

        // const playlists = playlistsQuery.data;

        // playlists?.forEach((p) => customItems.push({
        //     id: `add-song-to-playlist-${p.uuid}`,
        //     label: `Add to ${p.name}`,
        //     onClick: async () => {
        //         await new PlaylistService().addSong(userUuid!, p.uuid!, song.uuid!)
        //         queryClient.invalidateQueries({ queryKey: ['load-playlists', `load-playlist-${p.uuid}`] });
        //     }
        // })) ?? [];

        showMenu(event.clientX, event.clientY, customItems);
    };

    return (
        <div onContextMenu={handleRightClick} className={"app-song-context-wrapper " + className}>
            {children}
        </div>
    );
}