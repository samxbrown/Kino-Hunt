var genreList = document.getElementById('genre-list');
var startButton = document.getElementById('Start-Button');

function getGenre() {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0016bc5315mshb1bd2817991d6eep173fa0jsnb7451757afa6',
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

startButton.addEventListener('click', getGenre);

function getMovieList(clicked_id) {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=' + clicked_id + '&page=1';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0016bc5315mshb1bd2817991d6eep173fa0jsnb7451757afa6',
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



function getIMDB(results) {
  var title = [];
  var url = [];

  removeGenre();
  var waitText = document.createElement('h1');
  waitText.textContent = "Now Loading ...";
  waitText.setAttribute('id', 'title');
  waitText.setAttribute('class', 'button is-dark is-large fade-in-text');
  genreList.appendChild(waitText);

  
  for(var i = 0; i < results.length; i++){
    title[i] = results[i].original_title;
  }

  for(var i = 0; i < title.length; i++){
    url[i] = 'https://imdb8.p.rapidapi.com/title/find?q=' + title[i].replace(' ','%20');
  }

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2778a8bb70mshdc89ff7dadfe79ap15ae15jsna4aa1dcf4d98',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  var i = 0
  var intv = setInterval(function(){
        if(i < url.length){
        fetch(url[i], options)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var listItem = document.createElement('button');
            listItem.textContent = data.results[0].title;
            listItem.setAttribute('id', data.results[0].id);
            listItem.setAttribute('class', 'movie');
            listItem.style.display = 'none';
            listItem.setAttribute('onclick',"location.href='https://imdb.com" + data.results[0].id + "'");
            genreList.appendChild(listItem);
          });
          i++;
        }
        else {
          document.getElementById('title').remove();
          showMovies();
          clearInterval(intv);
          i = 0;
        }
  }, 350);
}

function removeGenre(){
  var genreButton = document.getElementsByClassName('genre');
  while(genreButton.length > 0){
    genreButton[0].remove();
  }
}

function showMovies(){
  var movieButton = document.getElementsByClassName('movie');
  for(var i = 0; i < movieButton.length; i++){
    movieButton[i].style.display = 'inline-block';
  }
}

function refreshPage(){
  window.location.reload();
} 

