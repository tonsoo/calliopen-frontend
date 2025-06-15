/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PublishSongRequest = {
    /**
     * UUID of the album this song belongs to.
     */
    album: string;
    name: string;
    /**
     * The cover image file (JPEG, PNG, etc., max 5MB).
     */
    cover: Blob;
    lyrics?: string | null;
    /**
     * The audio track file (MP3, WAV, FLAC, etc., max 25MB).
     */
    track: Blob;
    is_explicit?: boolean;
};

