/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SongsService {
    /**
     * Get songs within 1 month
     * @param page The page number to retrieve.
     * @param limit The number of results per page.
     * @returns Song List of songs
     * @throws ApiError
     */
    public static getSongs(
        page: number = 1,
        limit: number = 15,
    ): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Authentication required or invalid token.`,
            },
        });
    }
    /**
     * Get specific song
     * @param songUuid UUID of the song
     * @returns Song Song information
     * @throws ApiError
     */
    public static getSong(
        songUuid: string,
    ): CancelablePromise<Song> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs/{songUuid}',
            path: {
                'songUuid': songUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Artist or Album not found`,
            },
        });
    }
    /**
     * Add song to user's favorites
     * @param songUuid UUID of the song
     * @returns Song Song information
     * @throws ApiError
     */
    public static favoriteSong(
        songUuid: string,
    ): CancelablePromise<Song> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/songs/{songUuid}/favorite',
            path: {
                'songUuid': songUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Song not found`,
            },
        });
    }
    /**
     * Get user's favorite songs
     * @returns Song Songs
     * @throws ApiError
     */
    public static getFavoriteSongs(): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs/favorites',
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Song not found`,
            },
        });
    }
}
