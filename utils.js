export function getAlbumInfo(album) {
    return {
      title: album['name'],
      tracks: album.tracks.map(getTrackTitle),
    };
  }

export function getTracksInfo(album) {
    return album.tracks.map(getTrackTitle);
}
  
function getTrackTitle(track) {
    return `${track['disc_number']}. ${track['name']}`;
  }