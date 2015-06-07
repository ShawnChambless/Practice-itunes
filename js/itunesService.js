var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    this.getArtist = function(artist) {
        return $http({
            method: 'JSONP',
            url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
        });
    }

    this.parseData = function(songs) {

        var parsedSongs = [];

        for(var i = 0; i < songs.length; i++) {
            var finalData = {};

            finalData['Play'] = songs[i].previewUrl;
            finalData['Artist'] = songs[i].artistName;
            finalData['Song'] = songs[i].trackName;
            finalData['Collection'] = songs[i].collectionCensoredName;
            finalData['AlbumArt'] = songs[i].artworkUrl100;
            finalData['Type'] = songs[i].kind;
            finalData['CollectionPrice'] = songs[i].collectionPrice;

            parsedSongs.push(finalData);

        }
        return parsedSongs;
    };
this.gridOptions = {
    data: 'songData',
    height: '110px',
    sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
    columnDefs: [
      {field: 'Play', displayName: 'Preview', width: '80px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><div class="btn btn-lg btn-default"><span class="glyphicon glyphicon-play-circle"></span></div></a></div>'},
      {field: 'Artist', displayName: 'Artist'},
      {field: 'Song', displayName: 'Song'},
      {field: 'Collection', displayName: 'Album'},
      {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
      {field: 'CollectionPrice', displayName: 'Album Price'},
      {field: 'Type', displayName: 'Type'}
    ]
};
});
