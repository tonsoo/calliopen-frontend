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
     * @returns Song List of songs
     * @throws ApiError
     */
    public static getSongs(): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs',
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
                409: `Song is already in favorites`,
            },
        });
    }
}
