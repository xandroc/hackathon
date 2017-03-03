(function(window, $, _){

    function loadData(){
      fetch('/springs/get_data/WellMain', {method: 'get'})
        .then(function(res){
          return res.json();
        })
        .then(function(data){
          loadMarkers(data);
        });
    }
    
    function loadMarkers(data){
      var markers = [];
      _.each(data, function(well){
        var m = new google.maps.Marker({
          position: {lat: Number(well.LatitudeDD), lng: Number(well.LongitudeDD)},
          map: window.map._map
        });
        m._well = well;
        m.addListener('click', function(){
          var s = '<h2>' + well.StateWellNumber + '</h2>' + 
                  '<ul>' + 
                    '<li> Well Depth: ' + m._well.WellDepth  + '</li>' + 
                  '</ul>';        
          window.map.infoWindow.setContent(s);
          window.map.infoWindow.open(window.map._map, m);
        });
        markers.push(m);
      });
      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(window.map._map, markers,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      window.map.markers = markers;
    }
 
    //Wait until map is initialized 
    function initData() {
      loadData();
      //loadMarkers();
    }
    window.initData = initData;
})(window, jQuery, _);
