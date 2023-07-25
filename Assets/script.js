var genreList = document.getElementById('genre-list');

function getApi() {
    // replace `octocat` with anyone else's GitHub username
    var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';
  
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cb55d331c2msheffcf3623997c3bp1fc0f2jsn2b8f997e3c9f',
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
    };

    fetch(requestUrl,options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for(var i = 0; i < data.genres.length; i++){
            var listItem = document.createElement('li');
            console.log(data.genres[i].name);
            listItem.textContent = data.genres[i].name;
            genreList.appendChild(listItem);
        }
      });
  }

  getApi();