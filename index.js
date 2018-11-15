const TASTEDIVE_API_URL = 'https://tastedive.com/ask/ws';  
const accessKey = '323116-MoviesFo-TY8MX7RI';

function getDataFromAPI(theQuery, callbackFunc)
{    
    $.ajax({
        url: `${TASTEDIVE_API_URL}`,
        type: "get",
        dataType: 'jsonp',        
        data: {
            q: `${theQuery}`,
            format: "json",
            type: 'movies',
            info: 1,
            limit: 20,
            k: `${accessKey}`,             
        }    
    })        
        .done(callbackFunc)  
        .fail(function() {
            alert('Error occurred on server.  Please try again.');
    }); 
}



function renderResult(result) {   
    return `      
      <div class="result">
        <p class="bold"> ${result.Name} </p>
        <p class="description"> ${result.wTeaser}</p>
        <iframe width=100% height=200 src="https://www.youtube.com/embed/${result.yID}?feature=oembed\" frameborder="0" allowfullscreen></iframe> 
        <p>\n</p>
      </div>      
    `;    
}



function displayDataFromAPI(data)
{   
    if(data.Similar.Results.length === 0)
    {
        $('.js-search-results').html(`        
          <p class="bold"> Movies for this search not found. </p>       
        `);
    }
    else
    {
        const results = data.Similar.Results.map((item, index) => renderResult(item));
    
        $('.js-search-results').html(results); 
    } 
     
}


function GetSearchQuery(event){
    return $(event.currentTarget).find('.js-query').val();    
    
}


function handleGetMoviesButtonClick()
{
    //this function is the event handler for when the user clicks on the Get Movies button in the Search Page.
    //A list of movies similar to the inputted movie or topic is displayed.  The movie name, description, 
    //and trailer is listed for each suggested movie.    
    
    $('.js-form').on('submit', function(event) {
        event.preventDefault();
        
        let searchQuery = GetSearchQuery(event);

        //clear the search query textbox
        $(event.currentTarget).find('.js-query').val('');

        //get the data from the TasteDive API
        getDataFromAPI(searchQuery, displayDataFromAPI);        
                
    });    
}

function displaySearchPage()
{
    //remove the div showing the home page and display the div showing the searchPage
    $('div.homePage').remove();    
    $('div.searchPage').prop('hidden', false);  
    $('html').removeClass('homePageBackground');
    $('html').addClass('searchPageBackground');  
}

function handleEnterButtonClick()
{
    //this function is the event handler for when the user clicks on the Enter Button in the Home Page.
    //When the user clicks on the Enter button, the Search Page will display. 
    $('.homePage').on('click', '.js-enterButton',function (event) {        
        event.preventDefault();
        //show the search page
        displaySearchPage();
    });
}

function handleMovieApp()
{
    //this function is the callback for when the page loads.  It will handle all the events that occur in the movie app.   
    handleEnterButtonClick();
    handleGetMoviesButtonClick(); 
}

$(handleMovieApp);
