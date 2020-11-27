$(document).ready(function(){
    $("#search-btn").on('click', searchDataContent);
    $("#ramdom-btn").on('click', ramdomAPIContent);
    
    trendingFromAPI();
});

const apikey = "lGCVXIjnlS5aLwupl2Sjv005dNle3svM";
const limit = "40";

function searchDataContent() {
    
        var searchInput = $("#searchInput").val();
        if(searchInput === "") {
           
             var $div2 = $("#search-error-message");
                if ($div2.is(":visible")) { return; }
                     $div2.show();
                setTimeout(function() {
                  $div2.hide();
                    }, 7000);

        } else {
             $('#trending-content').html("");
            $('#search-error-message').hide(); 
            var xhr = $.get("http://api.giphy.com/v1/gifs/search?q='" + searchInput + "'&api_key="+apikey+"&"+limit+"");
            
                xhr.done(function(response) { 
                var searchGifData = response.data;

                for(var i in searchGifData){
                    $('#trending-content').append("<img  style='width: 400px; height:400px; margin:15px'src='"+searchGifData[i].images.original.url+"'/>");
          
                }
            });
        }
}

function ramdomAPIContent() {
        $('#trending-content').html("");
        $('#search-error-message').hide(); 
            var xhr = $.get("https://api.giphy.com/v1/gifs/random?api_key="+apikey+"&limit="+limit+"");
            
                xhr.done(function(response) { 
                var ramdomGifData = response.data;
                $('#trending-content').append("<img  style='width: 400px; height:400px; margin:15px'src='"+ramdomGifData.images.original.url+"'/>");
          
            }); 
}

function trendingFromAPI() {
     $('#trending-content').html("");
    var xhr = $.get("http://api.giphy.com/v1/gifs/trending?&api_key="+apikey+"&"+limit+"");
   
    xhr.done(function(response) {
        var trendingGifData = response.data;
        for( var i in trendingGifData) {

           $('#trending-content').append("<img  style='width: 400px; height:400px; margin:15px'src='"+trendingGifData[i].images.original.url+"'/>");

        }
    });
}



