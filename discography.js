import fs from "node:fs";

/**
 * Array of objects with Twice's entire discography up to I GOT YOU
 * 
 * @type {Array<Album>}
 */
const discography = JSON.parse(fs.readFileSync('./twice-releases.json', 'utf8'));

discography.sort((a, b) => a["release_date"].localeCompare(b["release_date"]));

/**
 * Array of Objects with each album and its tracks
 */
const albums = discography.map(getAlbumInfo); 

/**
 * Array of Arrays with all tracks
 */
const tracks = discography.map(getTracksInfo);  

const orderedTracks = orderArray(tracks);

const uniqueTracks = removeDuplicates(orderedTracks);

export { Album, albums, uniqueTracks }

/**
 * Gets title and track info for each album
 * @param {Album} album 
 * @returns
 */
export function getAlbumInfo(album) {
    return {
      title: album['name'],
      tracks: album.tracks.map(getTrackTitle),
    };
  }

  /**
 * Gets track info of all albums
 * @param {Album} album 
 * @returns {string[]}
 */
export function getTracksInfo(album) {
    return album.tracks.map(getTrackTitle);
}

  /**
 * Gets track name and number of each song
 * @param {Track} track 
 * @returns {string}
 */
function getTrackTitle(track) {
    return track['name'];
}

function removeDuplicates(arr){
  return arr.filter((elem, index) => arr.indexOf(elem) === index);
}

function orderArray(arr){
  return arr.flat().sort();
}

/**
 * @typedef {ExpandRecursively<AlbumObject>}
 */
var Album;

/**
 * @typedef {Object} AlbumObject
 * @property {string} name - Album title
 * @property {Array<Track>} tracks - Array of Objects for each track
 */

/**
 * @typedef {Object} Track
 * @property {string} name - Track title
 * @property {number} track-number - Track number within the album
 */

/**
 * @template T
 * @typedef {T extends infer O ? { [K in keyof O]: O[K]} : never} Expand
 */

/**
 * Represents the primitive data types in JavaScript.
 *
 * @typedef {string | number | bigint | boolean | symbol | null | undefined} Primitive
 */

/**
 * @template T
 * @typedef {T extends Primitive ? T : { [K in keyof T]: ExpandRecursively<T[K]> }} ExpandRecursively
 */