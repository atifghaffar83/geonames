$(window).on('load', function () { 
    if ($('#preloader').length) { 
      $('#preloader').delay(500).fadeOut('slow', function () { 
        $(this).remove(); 
        
      }); 
    } 
});

$(document).ready(() => {
    console.log("load event detected!");
   
const countryAjax = ()=>{

    $("#newResults").html("");

    $("#geonameFullResults").removeClass("geonameFullResults");
    $("#wikiResults").addClass("wikiResults");
    $("#earthQuakesResults").addClass("earthQuakesResults");
    $("#geonameSingleResults").addClass("geonameSingleResults");
    
    $.ajax({
        url: "libs/php/getCountryList.php",
        type: 'POST',
        dataType: 'json',

        success: function(results) {
            if (results.status.name == "ok") {
                let onlyData = results.data;
                for(let row in onlyData){
                    
                    //adding result rows to the table body
                    $("#newResults").append("<tr><td>"+onlyData[row]['countryName']+"</td><td>"+onlyData[row]['capital']+"</td><td>"+onlyData[row]['continentName']+
                    "</td><td>"+onlyData[row]['languages']+"</td><td>"+onlyData[row]['population']+"</td><td>"+onlyData[row]['areaInSqKm']+"</td></tr>")
                    
                    //adding result options to the droplist on front page
                    $("#selCountrys").append('<option data-id='+onlyData[row]["countryCode"]+' value='+onlyData[row]["countryCode"]+' data-value='
                    +onlyData[row]["countryCode"]+' data-south='+onlyData[row]["south"] +' data-north='+onlyData[row]["north"] +
                    ' data-east='+onlyData[row]["east"] +' data-west='+onlyData[row]["west"] +'>'+onlyData[row]['countryName']+'</option>');
                }
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    });
}

    //calling countryAjax function when the page is ready to load all countries
    countryAjax();
 

    let value;

    $('#selCountry').on('input', function() {
        value = $(this).val();
    });

       
    var getCountryInfo = function() {
        $("#geonameSingleResults").removeClass();
        $("#geonameFullResults").addClass("geonameFullResults");
        $("#earthQuakesResults").addClass("earthQuakesResults");
        $("#wikiResults").addClass("wikiResults");
        var tmp;
        $.ajax({
            url: "libs/php/getCountryInfo.php",
            
            type: 'POST',
            dataType: 'json',
            data: {
                //country: $('#selCountry').val(),
                country: $('#selCountrys [value="' + value + '"]').data("id"),
                lang: $('#selLanguage').val()
            },
            success: function(result) { 
        
                if (result.status.name == "ok") {
                    let onlyData = result.data;
                    tmp = result.data;
                    for(let row in onlyData){
                        $("#countryResults").html("<tr><td>"+onlyData[row]['countryName']+"</td><td>"+onlyData[row]['capital']+"</td><td>"+onlyData[row]['continentName']+
                        "</td><td>"+onlyData[row]['languages']+"</td><td>"+onlyData[row]['population']+"</td><td>"+onlyData[row]['areaInSqKm']+"</td></tr>")
                        
                        
                    }
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 

       
    };

    


    const getWikiInfo = () =>  {

        //$("#newResults").html("");
        $("#wikiResults").removeClass();
        $("#geonameFullResults").addClass("geonameFullResults");
        $("#earthQuakesResults").addClass("earthQuakesResults");
        $("#geonameSingleResults").addClass("geonameSingleResults");
        
        $.ajax({
            url: "libs/php/getwikiInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                //country: $('#selCountry').val(),
                country: $('#selCountrys [value="' + value + '"]').data("id"),
                //lang: $('#selLanguage').val()
            },
            success: function(result) {
                if (result.status.name == "ok") {
                    let onlyData = result.data;                    
                    for(let row in onlyData){
                        $("#wikiNewResults").html(`<tr><td>${onlyData[row]['title']}</td><td>${onlyData[row]['lat']}</td><td>${onlyData[row]['lng']}</td><td>${onlyData[row]['summary']}</td><td><img src=${onlyData[row]['thumbnailImg']}></td></tr>`)
                        
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    }

    const earthQuakes = () =>  {
        //console.log($('#selCountrys [value="' + value + '"]').data("north"));
        $("#earthQuakeNewResults").html("");
        $("#earthQuakesResults").removeClass();
        $("#geonameFullResults").addClass("geonameFullResults");
        $("#wikiResults").addClass("wikiResults");
        $("#geonameSingleResults").addClass("geonameSingleResults");
        
        $.ajax({
            url: "libs/php/earthquakesFinal.php",
            type: 'POST',
            dataType: 'json',
            data: {
                
                north: $('#selCountrys [value="' + value + '"]').data("north"),
                south: $('#selCountrys [value="' + value + '"]').data("south"),
                east: $('#selCountrys [value="' + value + '"]').data("east"),
                west: $('#selCountrys [value="' + value + '"]').data("west"),
                
            },
            success: function(result) {
                console.log(result);
                if (result.status.name == "ok") {
                    let onlyData = result.data;                    
                    for(let row in onlyData){
                        $("#earthQuakeNewResults").append(`<tr><td>${onlyData[row]['datetime']}</td><td>${onlyData[row]['depth']}</td>
                        <td>${onlyData[row]['lng']}</td><td>${onlyData[row]['lat']}</td><td>${onlyData[row]['src']}</td>
                        <td>${onlyData[row]['eqid']}</td><td>${onlyData[row]['magnitude']}</td></tr>`);
                        
                        
                        
                    }
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    
        
    }

    //calling all the functions on click event
    $('#singleCountry').click(getCountryInfo);
    $('#allCountries').click(countryAjax);
    $('#wikiInfo').click(getWikiInfo);
    $('#earthQuakeInfo').click(earthQuakes);


    
  }); 
