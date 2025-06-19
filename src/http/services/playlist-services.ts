import { ApiError, PlaylistsService } from "../../api";

export default class PlaylistService {
    async addSong(clientUuid:string, playlistUuid: string, songUuid: string) {
        try {
            return await PlaylistsService.addSongToPlaylist(clientUuid, playlistUuid, songUuid);
        } catch (e) {
            if (e instanceof ApiError) {
                switch (e.status) {
                    case 409: alert('This song already exists in the playlist');
                }

                console.log('Error adding sng to playlist', e);
                
                return;
            }

            throw e;
        }
    }
}