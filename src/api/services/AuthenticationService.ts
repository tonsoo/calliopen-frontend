/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Client } from '../models/Client';
import type { LoginRequest } from '../models/LoginRequest';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Authenticate user and get token
     * @param requestBody
     * @returns any Successful login
     * @throws ApiError
     */
    public static authLogin(
        requestBody: LoginRequest,
    ): CancelablePromise<{
        /**
         * Authentication token
         */
        token?: string;
        type?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
                404: `Client doesn"t exist`,
                422: `Validation error for request payload.`,
                500: `Unknown error`,
            },
        });
    }
    /**
     * Register a new user
     * @param requestBody
     * @returns Client Successful registration
     * @throws ApiError
     */
    public static authRegister(
        requestBody: RegisterRequest,
    ): CancelablePromise<Client> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Client with given data already exists`,
                422: `Validation error for request payload.`,
            },
        });
    }
}
