import { ApiError, SongsService as ApiSongService } from "../../api";

export default class SongsService {
    async favoriteSong(songUuid: string) {
        try {
            return await ApiSongService.favoriteSong(songUuid);
        } catch (e) {
            if (e instanceof ApiError) {
                switch (e.status) {
                    case 404: alert('Could not find the song, try refreshing the page.');
                }

                console.log('Error adding/removing song to favorites', e);
                
                return;
            }

            throw e;
        }
    }
}