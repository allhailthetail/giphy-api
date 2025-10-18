console.log("script.js loaded");

// Add the search button from the DOM
let resultBtn = document.getElementById("fetch-gif-btn");

// Add the endpoint variable
let endpoint = "https://api.giphy.com/v1/gifs/search?api_key=NRAeuq61KFE60yjhn4ggtvlLjv5fKs9f&q=dogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

// Point JS at the <div id="gif-container"></div>
// This is where the GIF images will go...
let gifContainer = document.querySelector("#gif-container");

async function giphyAPIFetch() {
    // Console log breadcrumb for debugging...
    console.log("giphyAPIFetch routine was called...");

    let apiResponse = await fetch(endpoint);
    let apiData = await apiResponse.json();

    // DEBUG:
    //console.log(apiData);

    // Empty list that'll hold just the URLs we're interested in
    let gifUrlList = [];

    // Now, we extract each URL we want to send back to caller function
    for(let i = 0; i < apiData.data.length; i++) {
        let url = apiData.data[i].images.fixed_height.url;
        //DEBUG: print each url
        //console.log(url);

        // Append to list:
        gifUrlList.push(url);
    }

    // DEBUG:
    //console.log(gifUrlList);

    // return list of URLs
    return gifUrlList;
}

// This was tricky, trial and error to realize this also needed to be async...
//   and gifUrls needed to also have await...
//   Without it, all I got back was a promise...? It wasn't done yet, I guess...
async function displayGifs() {
    // Console log breadcrumb for debugging...
    console.log("displayGIFs routine was called...");

    // call routine that requests JSON from Giphy:
    gifUrls = await giphyAPIFetch();

    // DEBUG:
    //console.log(gifUrls);

    // Now, add the images per the assignment...
    for (let i = 0; i < 4; i++) {
        // Retrieve an image for each iteration from list
        image = gifUrls[i];

        // Add an image to the DOM
        // Neat how this just uses +=.  Very intuitive...
        gifContainer.innerHTML += `<img src=${image} class = "col-3 mb-3">`;
    }
}

// Call a function to display the results (by editing div.innerHTML...)
resultBtn.addEventListener("click", displayGifs);
