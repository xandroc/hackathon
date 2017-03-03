(function(window, $, _){
    window.map = {};
    var _map;
    function initMap(){
      window.map._map = new google.maps.Map(document.getElementById('map'),{
        center: {lat:30.3857846, lng:-97.7253762},
        zoom: 8
        });
	  google.maps.event.addListenerOnce(window.map._map, 'idle', function(){
        initData();
	  });
      }
    window.initMap = initMap;
})(window, jQuery, _);
