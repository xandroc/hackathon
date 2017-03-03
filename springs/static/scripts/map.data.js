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
      _.each(data, function(marker){
        var m = new google.maps.Marker({
          position: {lat: Number(marker.LatitudeDD), lng: Number(marker.LongitudeDD)},
          map: window.map._map
        });
        markers.push(m);
      });
      window.map.markers = markers;
    }
 
    //Wait until map is initialized 
    function initData() {
      loadData();
      //loadMarkers();
    }
    window.initData = initData;
})(window, jQuery, _);
