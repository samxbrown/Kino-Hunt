var genreList = document.getElementById('genre-list');
var startButton = document.getElementById('Start-Button');


// function to get the list genres from the movie database API
function getGenre() {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '993d902a67msh4385d0fab854befp18d3d6jsnf2eb30b04e6d',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };

  // fetch request to gather the API genre list and the a for loop so that when the genre button is clicked the list of matching genre movies appear
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

startButton.addEventListener('click', getGenre);
//  function to show movie list after selecing the specific genre button
function getMovieList(clicked_id) {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=' + clicked_id + '&page=1';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '993d902a67msh4385d0fab854befp18d3d6jsnf2eb30b04e6d',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };
  setTimeout(() =>
    fetch(requestUrl, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        getIMDB(data.results);
      }), 300);
      
}


// function to gather IMDb results and remove the genre buttons
function getIMDB(results) {
  removeGenre();
  var title = [];
  var url = [];

  for (var i = 0; i < results.length; i++) {
    title[i] = results[i].original_title;
  }

  for (var i = 0; i < title.length; i++) {
    url[i] = 'https://imdb8.p.rapidapi.com/title/find?q=' + title[i].replace(' ', '%20');
  }

  // function to transfer user from Kino Hunt website to IMDb after selecting movie title
  for(var i = 0; i < url.length; i++){
      var listItem = document.createElement('button');
      listItem.textContent = results[i].title;
      listItem.setAttribute('id', url[i]);
      listItem.setAttribute('class', 'movie');
      if(localStorage.getItem(url[i]) == "visited"){
        listItem.style.color = "white";
      }
      listItem.style.display = 'inline-block';
      listItem.addEventListener('click', function (){
        goToIMDB(this.id);
      });
      genreList.appendChild(listItem);
      i++;
    }
}

function goToIMDB(id){
  localStorage.setItem(id,"visited");

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '993d902a67msh4385d0fab854befp18d3d6jsnf2eb30b04e6d',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  fetch(id, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          window.open('https://imdb.com'+data.results[0].id, "_self");
        });
  
  removeMovies();
  var waitText = document.createElement('h1');
  waitText.textContent = "Now Loading ...";
  waitText.setAttribute('id', 'title');
  waitText.setAttribute('class', 'button is-dark is-large fade-in-text');
  genreList.appendChild(waitText);
}

function removeGenre() {
  var genreButton = document.getElementsByClassName('genre');
  while (genreButton.length > 0) {
    genreButton[0].remove();
  }
}

function removeMovies() {
  var movieButton = document.getElementsByClassName('movie');
  while (movieButton.length > 0) {
    movieButton[0].remove();
  }
}

function refreshPage() {
  window.location.reload();
}




