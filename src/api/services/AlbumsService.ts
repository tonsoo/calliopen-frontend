/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from '../models/Album';
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlbumsService {
    /**
     * Get all albums within 1 month
     * @param page The page number to retrieve.
     * @param limit The number of results per page.
     * @returns Album List of albums
     * @throws ApiError
     */
    public static getAlbums(
        page: number = 1,
        limit: number = 15,
    ): CancelablePromise<Array<Album>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Artist or Album not found`,
            },
        });
    }
    /**
     * Get album
     * @param albumUuid UUID of the album
     * @returns Album Album information
     * @throws ApiError
     */
    public static getAlbum(
        albumUuid: string,
    ): CancelablePromise<Album> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums/{albumUuid}',
            path: {
                'albumUuid': albumUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Album not found`,
            },
        });
    }
    /**
     * Get songs in an album
     * @param albumUuid UUID of the album
     * @param page The page number to retrieve.
     * @param limit The number of results per page.
     * @returns Song List of songs in the album
     * @throws ApiError
     */
    public static getAlbumSongs(
        albumUuid: string,
        page: number = 1,
        limit: number = 15,
    ): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums/{albumUuid}/songs',
            path: {
                'albumUuid': albumUuid,
            },
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Album not found`,
            },
        });
    }
}
