/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicClient } from './BasicClient';
import type { Song } from './Song';
/**
 * Represents a song"s entry in a playlist, including pivot data like order and who added it.
 */
export type PlaylistSong = {
    /**
     * The full song object details.
     */
    song?: Song;
    /**
     * The client who added this song to the playlist.
     */
    added_by?: BasicClient;
    /**
     * The sequential order of the song within the playlist.
     */
    order?: number;
    /**
     * Timestamp when the song was added to the playlist.
     */
    added_at?: string;
};

