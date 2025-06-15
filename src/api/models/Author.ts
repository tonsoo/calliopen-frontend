/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from './Album';
import type { AuthorLink } from './AuthorLink';
import type { BasicClient } from './BasicClient';
/**
 * Represents an artist/author, linked to a client.
 */
export type Author = {
    /**
     * The author"s unique identifier.
     */
    uuid?: string;
    /**
     * The author"s stage name or public name.
     */
    name?: string;
    /**
     * Biography of the artist.
     */
    bio?: string | null;
    /**
     * The associated client account for this artist.
     */
    client?: BasicClient;
    /**
     * Albums created by this artist.
     */
    albums?: Array<Album>;
    /**
     * External links for the artist (social media, etc.).
     */
    links?: Array<AuthorLink>;
};

