var genreList = document.getElementById('genre-list');
var startButton = document.getElementById('Start-Button');

function getApi() {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cb55d331c2msheffcf3623997c3bp1fc0f2jsn2b8f997e3c9f',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };

  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.genres.length; i++) {
        var listItem = document.createElement('button');
        listItem.textContent = data.genres[i].name;
        listItem.setAttribute('id', data.genres[i].id);
        listItem.setAttribute('class', 'genre');
        listItem.addEventListener('click', function () {
          getMovieList(this.id);
        })
        genreList.appendChild(listItem);
      }
    });

  startButton.style.display = "none";
}

startButton.addEventListener('click', getApi);

function getMovieList(clicked_id) {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=' + clicked_id + '&page=1';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cb55d331c2msheffcf3623997c3bp1fc0f2jsn2b8f997e3c9f',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };

  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.results.length; i++) {
        console.log(data.results[i].original_title);
      }
    });
}



function getApi() {
  var requestUrl = 'https://rapidapi.com/apidojo/api/imdb8/';

  var options = {
    method: GET,
    headers: {
      'X-RapidAPI-Key': '0016bc5315mshb1bd2817991d6eep173fa0jsnb7451757afa6',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };
  
  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
