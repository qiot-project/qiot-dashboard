
console.log('hello');
$(document).ready(function(){
    console.log('Ready...');

    //bind functions
    $('#location_select').on('change',function(e){
        var selection = e.target.value;

        $.ajax({
            url: '/map/'+selection
        }).done(function(json){
            console.log('Got Response',json);
        })

    })

    getStations();

    // getCenters();

});
var map = null;
var infowindow = null;
function initMap(){
    $(document).ready(function(){
        var london = {lat: 48.135, lng: 11.582};
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 3, center: london});
        infowindow = new google.maps.InfoWindow();
    })
    
}

//load data locations
function getStations(){


  $.ajax({
    url: '/admin/stations'
  }).done(function(json){
    console.log('stations',json);
    var stations = json;
    for(var i=0; i<stations.length;i++){
      // plot coords of station
      var coords = {lng: stations[i].location.coordinates[0], lat: stations[i].location.coordinates[1]};
      var marker = new google.maps.Marker({
        position: coords,
        map: map,
        stationId: stations[i]._id,
        label: stations[i].name
      })

      // create infowindow for station
      marker.addListener("click", showInfoWindow);
      
    }
  })
  
}

function showInfoWindow(){
    var self = this;
    infowindow.setContent('');
    infowindow.close();
    infowindow.setContent('Loading... '+ this.label + ' (id:' + this.stationId + ')');

    //fetchHTML
    var content = $('#infoWindowContainer').html();
    infowindow.setContent(content);
    $('#chart_div').html("Loading....");
    infowindow.open(map, this);
    setTimeout(function(){
      $('#stationName').html(self.label);
      
      plotChart();
    },5000);
}