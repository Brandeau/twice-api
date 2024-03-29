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

const uniqueTracks = removePrimitiveDuplicates(orderedTracks);

export { Album, albums, uniqueTracks, filterAlbumsByDate, discography, getAlbumInfo }

/**
 * Gets title and track info for each album
 * @param {Album} album 
 * @returns
 */
function getAlbumInfo(album) {
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
function getTracksInfo(album) {
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

/**
 * Remove duplicate primitive elements from array
 * 
 * @param {Array<string | number | boolean>} arr 
 * @returns {Array<string | number | boolean>}
 */
function removePrimitiveDuplicates(arr){
  return arr.filter((elem, index) => arr.indexOf(elem) === index);
}

/**
 * Flattens an array and then sorts it in ascending order
 * 
 * @param {Array} arr 
 * @returns {Array}
 */
function orderArray(arr){
  return arr.flat().sort();
}

/**
 * 
 * @param {Array} data - array with Twice albums
 * @param {string} start_date - start date to use as lower limit for the filter
 * @param {string} end_date - end date to use as upper limit for the filter
 * @returns {Array}
 */
function filterAlbumsByDate(data, start_date, end_date){
  return data.filter(item => item['release_date'] >= start_date && item['release_date'] <= end_date)
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