//Fonction de géolocalisation

// Si l'utilsateur autorise la géoloc initie la google maps avec sa position
// sinon n'affiche rien ce qui laisse apparaitre un message d'erreur
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latUser = position.coords.latitude;
        var lngUser = position.coords.longitude;
        initMap(latUser, lngUser);
    })
}

// Appelle AJAX qui appelle le JSON des consessions pour afficher les cartes de visite
$.ajax({
  url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=500&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&refine.type=SANISETTE",
  type: "GET",
  dataType: "json",
  success: function (data) {
    
    var toilettes = data;
    $.each(toilettes.records, function (i, toilette) {
      $(".swiper-wrapper").append(`
        <div class="swiper-slide">
            <div class="testimonial-item">
              <p>${toilette.fields.horaire}</p>
              <h4>${toilette.fields.adresse.toUpperCase()}</h4>
              <h5>${toilette.fields.arrondissement.toUpperCase()}</h5>
              <p>PMR : ${toilette.fields.acces_pmr}</p>
            </div>
        </div>`);
    });
  },
  error: function (error) {
    console.warn(error);
  },
});

//Affiche la google map, la géoloc comme premier marqueur et les différentes conssesion en marqueurs.

// Initialize and add the map
function initMap(lat, lng) {
  var posUser = { lat: parseFloat(lat), lng: parseFloat(lng) };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: posUser,
  });

  //Appelle AJAX qui appelle le JSON des consessions pour afficher les markers
  $.ajax({
    url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=500&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&refine.type=SANISETTE",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var toilettes = data;
      
      $.each(toilettes.records, function (i, toilette) 
      {
        position = 
        {
          lat: toilette.fields.geo_shape.coordinates[0][1],
          lng: toilette.fields.geo_shape.coordinates[0][0],
        };
        addMarker(position, map, toilette);

      });
    },
    error: function (error) {
      console.warn(error);
    },
  });

  // The marker, positioned at Uluru
  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    
  };

  let markerUser = new google.maps.Marker({
    position: posUser,
    map: map,
    icon: svgMarker,
  });

  markerUser.setIcon(svgMarker)


}



function addMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    // icon: "./styles/img/map/logo-marker.png",
  });
}
// google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
//   return function() {
//       infowindow.setContent(content);
//       infowindow.open(map,marker);
//   };
// })(marker,content,infowindow));  