var form = document.getElementById('form');
var center = [19.4584, 51.7590];

var map = tt.map({
    key: 'bnG60THfhQlGsKzwEJsaqzr8G8CQGVFV',
    container: 'map',
    style: 'tomtom://vector/1/basic-main',
    center: center,
    zoom: 6
});

//add controls of map
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());

//add marker
var marker = new tt.Marker({
    draggable: true
}).setLngLat(center).addTo(map);

//function to drag marker
marker.on('dragend', function() {
    var lngLat = marker.getLngLat();
    var Popup = new tt.Popup({ className: 'tt-popup', offset: 35})
        .setLngLat(lngLat)
        .setHTML('<b>Longitude:</b> ' + lngLat.lng + '<br><b>Latitude:</b> ' + lngLat.lat);
    marker.setPopup(Popup);
    marker.togglePopup();
    form.taskLong.value = Math.round(lngLat.lng * 10000)/10000;
    form.taskLat.value = Math.round(lngLat.lat * 10000)/10000;

});

//function to place marker on click
map.on('click', function(event) {
    marker.setLngLat(event.lngLat);
    var Popup = new tt.Popup({ className: 'tt-popup', offset: 35})
        .setLngLat(event.lngLat)
        .setHTML('<b>Longitude:</b> ' + event.lngLat.lng + '<br><b>Latitude:</b> ' + event.lngLat.lat);
    marker.setPopup(Popup);
    marker.togglePopup();
    form.taskLong.value = Math.round(event.lngLat.lng * 10000)/10000;
    form.taskLat.value = Math.round(event.lngLat.lat * 10000)/10000;
});