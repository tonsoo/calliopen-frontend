/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from '../models/Album';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlbumsService {
    /**
     * Get all albums within 1 month
     * @returns Album List of albums
     * @throws ApiError
     */
    public static getAlbums(): CancelablePromise<Array<Album>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums',
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Artist or Album not found`,
            },
        });
    }
}
