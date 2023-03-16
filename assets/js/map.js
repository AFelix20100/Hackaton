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
  const marker = new google.maps.Marker({
    position: posUser,
    map: map,
  });


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