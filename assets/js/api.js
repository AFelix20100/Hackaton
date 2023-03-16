$.ajax({
    url : "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=434&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe",
    type : "GET",
    datatype : "json",
    success: function (data){
        var toilettes = data.records;
        console.log(toilettes);
        $.each(toilettes, function (i, toilette) {
            $("#listeToilettes").append(`
                <div class='listeItem'>
                    <div class='row'>
                        <div class='col-8'>
                            <div class='row'>
                                <div class='adresse'>
                                
                                    <p>${toilette.fields.acces_pmr}</p>
                                    <p>${toilette.fields.geo_shape.coordinates}</p>
                                    <p>${toilette.fields.horaire}</p>
                                    <p>${toilette.fields.adresse} </p>
                                    <p>${toilette.fields.arrondissement}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    },
    error: function (error) {
        console.warn(error);
    },
});
