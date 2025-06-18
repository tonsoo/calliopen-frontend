/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Author } from './Author';
import type { Song } from './Song';
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
    /**
     * Songs in the album
     */
    songs?: Array<Song> | null;
};

