/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Author } from './Author';
export type Album = {
    /**
     * The album"s unique identifier.
     */
    uuid?: string;
    /**
     * The name of the album.
     */
    name?: string;
    /**
     * URL to the album cover image.
     */
    cover?: string;
    /**
     * The artist who created this album.
     */
    creator?: Author;
};

