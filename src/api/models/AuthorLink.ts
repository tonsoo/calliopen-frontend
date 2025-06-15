/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * External link associated with an artist.
 */
export type AuthorLink = {
    /**
     * Name of the link (e.g., "Spotify", "Instagram").
     */
    name?: string;
    /**
     * The URL of the link.
     */
    url?: string;
    /**
     * URL to an image representing the link (e.g., logo).
     */
    image?: string;
    /**
     * Display order of the link.
     */
    order?: number;
    /**
     * Whether the link should be publicly visible.
     */
    is_visible?: boolean;
};

