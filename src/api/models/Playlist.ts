/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicClient } from './BasicClient';
import type { PlaylistSong } from './PlaylistSong';
export type Playlist = {
    /**
     * The playlist"s unique identifier.
     */
    uuid?: string;
    /**
     * The creator of the playlist.
     */
    creator?: BasicClient;
    /**
     * URL to the playlist cover image.
     */
    cover?: string | null;
    /**
     * The name of the playlist.
     */
    name?: string;
    /**
     * Total duration of songs in milliseconds.
     */
    total_duration?: number;
    /**
     * Indicates if the playlist is publicly visible.
     */
    is_public?: boolean;
    /**
     * List of songs in the playlist, including pivot details.
     */
    songs?: Array<PlaylistSong>;
    /**
     * List of clients collaborating on this playlist.
     */
    collaborators?: Array<BasicClient>;
    /**
     * Timestamp when the playlist was created.
     */
    created_at?: string;
};

