/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Author } from '../models/Author';
import type { PublishSongRequest } from '../models/PublishSongRequest';
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArtistsService {
    /**
     * Get all artists
     * @param page The page number to retrieve.
     * @param limit The number of results per page.
     * @returns Author List of artists
     * @throws ApiError
     */
    public static getAllArtists(
        page: number = 1,
        limit: number = 15,
    ): CancelablePromise<Array<Author>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists',
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
     * Get authenticated artist"s information
     * @returns Author Authenticated artist information
     * @throws ApiError
     */
    public static getMyArtistInformation(): CancelablePromise<Author> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists/me',
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Authenticated user is not an artist`,
            },
        });
    }
    /**
     * Get specific artist"s information by UUID
     * @param authorUuid UUID of the artist
     * @returns Author Artist information
     * @throws ApiError
     */
    public static getArtistInformation(
        authorUuid: string,
    ): CancelablePromise<Author> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists/{authorUuid}',
            path: {
                'authorUuid': authorUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Artist not found`,
            },
        });
    }
    /**
     * Get allt songs by a specific artist
     * @param authorUuid UUID of the artist
     * @param page The page number to retrieve.
     * @param limit The number of results per page.
     * @returns Song List of songs in the album
     * @throws ApiError
     */
    public static getArtistSongs(
        authorUuid: string,
        page: number = 1,
        limit: number = 15,
    ): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists/{authorUuid}/songs',
            path: {
                'authorUuid': authorUuid,
            },
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Artist not found`,
            },
        });
    }
    /**
     * Publish a new song by an artist
     * @param authorUuid UUID of the artist
     * @param formData
     * @returns any Song published successfully (returns no content by default, can be updated)
     * @throws ApiError
     */
    public static publishSong(
        authorUuid: string,
        formData: PublishSongRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/artists/{authorUuid}/songs/publish',
            path: {
                'authorUuid': authorUuid,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Not author`,
                422: `Validation error for request payload.`,
                500: `Internal Server Error (e.g., conversion failed)`,
            },
        });
    }
    /**
     * Remove a song published by an artist
     * @param authorUuid UUID of the artist
     * @param songUuid UUID of the song to remove
     * @returns any Song removed successfully (returns no content by default, can be updated)
     * @throws ApiError
     */
    public static removeArtistSong(
        authorUuid: string,
        songUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/artists/{authorUuid}/songs/{songUuid}/remove',
            path: {
                'authorUuid': authorUuid,
                'songUuid': songUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                403: `Not author`,
                404: `Artist or Song not found`,
            },
        });
    }
}
