/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Client = {
    /**
     * The client"s unique identifier.
     */
    uuid?: string;
    /**
     * The client"s full name.
     */
    name?: string;
    /**
     * The client"s email address.
     */
    email?: string;
    /**
     * The client"s username.
     */
    username?: string;
    /**
     * User settings as a JSON object.
     */
    settings?: Record<string, any> | null;
    /**
     * URL to the client"s avatar image.
     */
    avatar?: string | null;
    /**
     * Indicates if the client also has an artist profile.
     */
    is_artist?: boolean;
    /**
     * Timestamp when the client was created.
     */
    created_at?: string;
    /**
     * Timestamp when the client was last updated.
     */
    updated_at?: string;
};

