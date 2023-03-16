$.ajax({
    url : "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=434&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe",
    type : "GET",
    datatype : "json",
    success: function (data){
        var toilettes = data.records;
        console.log(toilettes);
        $.each(toilettes, function (i, toilette) {
            $("#listeToilettes").append(`
            <div class="row">
            <div class= "col-md-6">
            <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${toilette.fields.adresse}, ${toilette.fields.arrondissement}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${toilette.fields.horaire}</h6>
              <p class="card-text">Accès handicap : ${toilette.fields.acces_pmr}</p>
              
            </div>
          
            `);
        });
    },
    error: function (error) {
        console.warn(error);
    },
});
