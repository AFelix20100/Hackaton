

$.ajax({
    url : "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe",
    type : "POST",
    datatype : "json",
    success: function (data){
        var toilettes = data;
        $.each(toilettes, function (i, toilette) {
            $("#listeToilettes").append(`
            <div class='listeItem'>
                <div class='row'>
                    <div class='col-8'>
                        <div class='row'>
                            
                            <div class='adresse'>
                                <p>${toilette.fields.heure}</p>
                                <p>${toilette.adresse} </p>
                                <p>${toilette.arrondissement}</p>
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
    


