

$.ajax({
    url : "https://opendata.paris.fr/explore/dataset/sanisettesparis/api",
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
    


