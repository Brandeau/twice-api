const rawAlbums = [
    {
      title: "The Family Jewels",
      tracks: [
        {
          no: 1,
          title: "Are You Satisfied?",
        },
      ],
    },
    {
      title: "Electra Heart",
      tracks: [
        {
          no: 1,
          title: "Bubblegum Bitch",
        },
      ],
    },
  ];
  
const albums = rawAlbums.map(getAlbumInfo);  

function getAlbumInfo(album) {
    return {
      title: album.title,
      tracks: album.tracks.map(getTrackTitle),
    };
  }
  
  function getTrackTitle(track) {
    return `${track.no}. ${track.title}`;
  }