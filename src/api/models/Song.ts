/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from './Album';
export type Song = {
    /**
     * The song"s unique identifier.
     */
    uuid?: string;
    /**
     * The title of the song.
     */
    name?: string;
    /**
     * The album this song belongs to.
     */
    album?: Album;
    /**
     * URL to the song"s cover image.
     */
    cover?: string | null;
    /**
     * The lyrics of the song.
     */
    lyrics?: string | null;
    /**
     * Indicates if the song contains explicit content.
     */
    is_explicit?: boolean;
    /**
     * Number of times the song has been viewed/played.
     */
    views?: number;
    /**
     * URL to the song"s audio file.
     */
    file?: string;
    /**
     * Duration of the song in milliseconds.
     */
    duration?: number;
    /**
     * Is the song favoried by the user
     */
    is_favorite?: boolean;
    /**
     * Timestamp when the song was created.
     */
    created_at?: string;
    /**
     * Timestamp when the song was last updated.
     */
    updated_at?: string;
};

