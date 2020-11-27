$(document).ready(function(){
    $("#search-btn").on('click', searchDataContent);
    $("#ramdom-btn").on('click', ramdomAPIContent);
    
    trendingFromAPI();
});

const apikey = "InsertYouAPIKey";
const limit = "40";

function searchDataContent() {
    
        var searchInput = $("#searchInput").val();
        if(searchInput === "") {
           displayErrorMessage("Please enter some text to use the search.");
          
        } else {
            var xhr = $.get("http://api.giphy.com/v1/gifs/search?q='" + searchInput + "'&api_key="+apikey+"&"+limit+"");
            
            xhr.done(function(response) { 
                $('#trending-content').html("");
                $('#error-message').hide(); 
                var searchGifData = response.data;

                for(var i in searchGifData){
                    $('#trending-content').append("<img  style='width: 400px; height:400px; margin:15px'src='"+searchGifData[i].images.original.url+"'/>");
          
                }
            });
                xhr.fail(function() {
                  displayErrorMessage("Ops we could not retrieve the gifs you were searching for.");
})
        }
}

function ramdomAPIContent() {
       
        $('#error-message').hide(); 
            var xhr = $.get("https://api.giphy.com/v1/gifs/random?api_key="+apikey+"&limit="+limit+"");
            
                xhr.done(function(response) { 
                     $('#trending-content').html("");
                var ramdomGifData = response.data;
                $('#trending-content').append("<img  style='width: 400px; height:400px; margin:15px'src='"+ramdomGifData.images.original.url+"'/>");
          
            }); 

                xhr.fail(function() {
                displayErrorMessage("Ops we could not retrieve the random gif.");
})

}

function trendingFromAPI() {
    
    var xhr = $.get("http://api.giphy.com/v1/gifs/trending?&api_key="+apikey+"&"+limit+"");
   
    xhr.done(function(response) {
         $('#trending-content').html("");
        var trendingGifData = response.data;
        for( var i in trendingGifData) {

           $('#trending-content').append("<img  style='width: 400px; height:400px; margin:15px'src='"+trendingGifData[i].images.original.url+"'/>");

        }
    });

            xhr.fail(function() {
            displayErrorMessage("Ops we could not retrieve the trending gifs.");
})
}

function displayErrorMessage(message) {
        var $div2 = $("#error-message");
                $div2.html(message);
                if ($div2.is(":visible")) { return; }
                     $div2.show();
                setTimeout(function() {
                  $div2.hide();
                    }, 10000);
}



