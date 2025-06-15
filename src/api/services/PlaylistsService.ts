/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePlaylistRequest } from '../models/CreatePlaylistRequest';
import type { Playlist } from '../models/Playlist';
import type { PlaylistSong } from '../models/PlaylistSong';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlaylistsService {
    /**
     * Get all playlists for a specific user
     * @param clientUuid UUID of the client
     * @returns Playlist List of playlists
     * @throws ApiError
     */
    public static getUserPlaylists(
        clientUuid: string,
    ): CancelablePromise<Array<Playlist>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{clientUuid}/playlists',
            path: {
                'clientUuid': clientUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                403: `User does not have permission to perform this action.`,
                404: `Client not found`,
            },
        });
    }
    /**
     * Create a new playlist for a user
     * @param clientUuid UUID of the client
     * @param requestBody
     * @returns Playlist Playlist created successfully
     * @throws ApiError
     */
    public static createPlaylist(
        clientUuid: string,
        requestBody: CreatePlaylistRequest,
    ): CancelablePromise<Playlist> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{clientUuid}/playlists/create',
            path: {
                'clientUuid': clientUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication required or invalid token.`,
                403: `User does not have permission to perform this action.`,
                422: `Validation error for request payload.`,
            },
        });
    }
    /**
     * Get a specific playlist by UUID
     * @param clientUuid UUID of the client
     * @param playlistUuid UUID of the playlist
     * @returns Playlist Specific playlist details
     * @throws ApiError
     */
    public static getSpecificPlaylist(
        clientUuid: string,
        playlistUuid: string,
    ): CancelablePromise<Playlist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{clientUuid}/playlists/{playlistUuid}',
            path: {
                'clientUuid': clientUuid,
                'playlistUuid': playlistUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Private playlist or forbidden access`,
                404: `Playlist not found`,
            },
        });
    }
    /**
     * Get songs for a specific playlist
     * @param clientUuid UUID of the client
     * @param playlistUuid UUID of the playlist
     * @returns PlaylistSong List of songs in the playlist (including pivot data)
     * @throws ApiError
     */
    public static getPlaylistSongs(
        clientUuid: string,
        playlistUuid: string,
    ): CancelablePromise<Array<PlaylistSong>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{clientUuid}/playlists/{playlistUuid}/songs',
            path: {
                'clientUuid': clientUuid,
                'playlistUuid': playlistUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Private playlist or forbidden access`,
                404: `Playlist not found`,
            },
        });
    }
    /**
     * Add a song to a playlist
     * @param clientUuid UUID of the client
     * @param playlistUuid UUID of the playlist
     * @param songUuid UUID of the song to add
     * @returns Playlist Song added to playlist successfully
     * @throws ApiError
     */
    public static addSongToPlaylist(
        clientUuid: string,
        playlistUuid: string,
        songUuid: string,
    ): CancelablePromise<Playlist> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{clientUuid}/playlists/{playlistUuid}/add/{songUuid}',
            path: {
                'clientUuid': clientUuid,
                'playlistUuid': playlistUuid,
                'songUuid': songUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Private playlist or forbidden access`,
                404: `Client, Playlist, or Song not found`,
                409: `Conflict (e.g., Song already in playlist)`,
                500: `Failed to add song to playlist`,
            },
        });
    }
    /**
     * Remove a song from a playlist
     * @param clientUuid UUID of the client
     * @param playlistUuid UUID of the playlist
     * @param songUuid UUID of the song to remove
     * @returns Playlist Song removed from playlist successfully
     * @throws ApiError
     */
    public static removeSongFromPlaylist(
        clientUuid: string,
        playlistUuid: string,
        songUuid: string,
    ): CancelablePromise<Playlist> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{clientUuid}/playlists/{playlistUuid}/remove/{songUuid}',
            path: {
                'clientUuid': clientUuid,
                'playlistUuid': playlistUuid,
                'songUuid': songUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Private playlist or forbidden access`,
                404: `Client, Playlist, or Song not found`,
            },
        });
    }
    /**
     * Reorder songs in a playlist
     * @param clientUuid UUID of the client
     * @param playlistUuid UUID of the playlist
     * @param requestBody
     * @returns PlaylistSong Playlist order updated successfully
     * @throws ApiError
     */
    public static reorderPlaylistSongs(
        clientUuid: string,
        playlistUuid: string,
        requestBody: {
            /**
             * An ordered list of song UUIDs representing the new order.
             */
            uuids?: Array<string>;
        },
    ): CancelablePromise<Array<PlaylistSong>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{clientUuid}/playlists/{playlistUuid}/order',
            path: {
                'clientUuid': clientUuid,
                'playlistUuid': playlistUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Private playlist or forbidden access`,
                404: `Client or Playlist not found`,
                409: `Conflict (e.g., duplicate UUIDs or song not found)`,
                422: `Validation error for request payload.`,
            },
        });
    }
}
