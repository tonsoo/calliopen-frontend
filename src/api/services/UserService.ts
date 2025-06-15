/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicClient } from '../models/BasicClient';
import type { Client } from '../models/Client';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get authenticated user"s information
     * @returns Client User information
     * @throws ApiError
     */
    public static getUserInformation(): CancelablePromise<Client> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            errors: {
                401: `Authentication required or invalid token.`,
            },
        });
    }
    /**
     * Get another user"s public information by UUID
     * @param clientUuid UUID of the client
     * @returns BasicClient Other user"s basic information
     * @throws ApiError
     */
    public static getOtherUserInformation(
        clientUuid: string,
    ): CancelablePromise<BasicClient> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{clientUuid}',
            path: {
                'clientUuid': clientUuid,
            },
            errors: {
                401: `Authentication required or invalid token.`,
                404: `Client not found`,
            },
        });
    }
}
