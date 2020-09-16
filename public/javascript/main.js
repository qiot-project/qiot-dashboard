
console.log('hello');
$(function(){
    console.log('Ready...');
    
    // set active navigation tab
    $('.nav li').removeClass('active');
    var loc = document.location.pathname;
    $('a[href="'+loc+'"]').parent().addClass('active');


    //bind functions
    $('#location_select').on('change',function(e){
        var selection = e.target.value;

        $.ajax({
            url: '/map/'+selection
        }).done(function(json){
            console.log('Got Response',json);
        })
    })
    $('.chartBox h4').on('click',function(e){
      $('.chartBox').addClass('collapsed');
      $(e.target).parent().toggleClass('collapsed');
    })


    getStations();
});

function resetMap(){
  map.setZoom(3);
  map.setCenter({lat: 48.135, lng: 11.582});
}

var map = null;
var infowindow = null;
function initMap(){
    $(function(){
      // return if not on map page
      if(document.location.pathname !== "/map"){
        return;
      }
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

    var markers = {};
    for(var i=0; i<stations.length;i++){

      if(document.location.pathname === "/map"){
        // plot coords of station
        var coords = {lng: stations[i].location.coordinates[0], lat: stations[i].location.coordinates[1]};
        var marker = new google.maps.Marker({
          position: coords,
          map: map,
          stationId: stations[i]._id,
          label: stations[i].name
          // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        })

        // create infowindow for station
        marker.addListener("click", showInfoWindow);
        markers[i] = marker;
      } else if(document.location.pathname === "/charts"){
        
        var sid = stations[i]._id;
        var htmlStr = "<div class='item' onclick='viewCharts("+sid+")' data-id='"+sid+"'>"+ stations[i].name + "</div>";
        $('#stationList').append(htmlStr);
      }
      
      
    }

    // cluster map markers
    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  })
}

function getLastWeek(stationId, cb){
  $.ajax({
    url: '/admin/lastweek/' + stationId
  }).done(function(data){
    console.log('station last week',data);
    var chartArray = [];
    for(var i=0; i<data.length;i++){
      // build data array for infoWindow chart
      chartArray[i] = [i, data[i].avg];
    }
    //TODO: use async
    setTimeout(function(){
      return cb(null,chartArray);
    },0)
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
    
    // show last 7 days data
    getLastWeek(this.stationId, function(err,data){
      $('#stationName').html(self.label);
      if(data.length === 0){
        $('#chart_div').html("No data available for this station");
      } else {
        console.log(data);
        plotChart(data, 'chart_div');
      }
    })
}


function viewCharts(stationId){
  $('#stationList .item').removeClass('active');
  $('.item[data-id='+stationId+']').addClass('active');
  chartData = {};
  //show chart divs
  
  //fetchdata
  $.when(
    $.get('/admin/lastweek/'+stationId, function(data){
      var chartArray = [];
      for(var i=0; i<data.length;i++){
        chartArray[i] = [i, data[i].avg];
      }
      chartData.lastweek = chartArray;
    }),

    $.get('/admin/lastmonth/'+stationId, function(data){
      var chartArray = [];
      for(var i=0; i<data.length;i++){
        chartArray[i] = [i, data[i].avg];
      }
      chartData.lastmonth = chartArray;
    }),

    $.get('/admin/lastyear/'+stationId, function(data){
      var chartArray = [];
      for(var i=0; i<data.length;i++){
        chartArray[i] = [i, data[i].avg];
      }
      chartData.lastyear = chartArray;
    })

  ).then(function(){
    console.log('lastweek', chartData);
    plotChart(chartData.lastweek,'lastweekchart');
    plotChart(chartData.lastmonth,'lastmonthchart');
    plotChart(chartData.lastyear,'lastyearchart');
    $('.chartBox').addClass('collapsed');
    $('#lastWeek.chartBox').removeClass('collapsed');
  })
}

function getCustomChart(){
  var stationId = $('.item.active').attr('data-id');
  
  //TODO: use custom values to request data
}