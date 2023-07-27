var genreList = document.getElementById('genre-list');
var startButton = document.getElementById('Start-Button');

function getGenre() {
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
      var dropdownData = data.map(item => genre.name);
      createDropdown(dropdownData);
    });

  startButton.style.display = "none";
}

startButton.addEventListener('click', getGenre);

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
        getIMDB(data.results[i].original_title);
      }
    });
}



function getIMDB(title) {
  var search = "";
  var arr = title.split(' ');
  for(var i = 0; i < arr.length-1; i++){
    search = search + arr[i] + "%20";
  }
  search = search + arr[arr.length-1];
  console.log(search);
  var requestUrl = 'https://imdb8.p.rapidapi.com/title/find?q=' + search;

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cb55d331c2msheffcf3623997c3bp1fc0f2jsn2b8f997e3c9f',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };
  
  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('imdb.com'+data.results[0].id);
    });
}

function refreshPage(){
  window.location.reload();
} 