var genreList = document.getElementById('genre-list');
var startButton = document.getElementById('Start-Button');

function getGenre() {
  var requestUrl = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fd4074fae1msh6b1818e765fa4bbp1324bajsn12b9c926a636',
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
      'X-RapidAPI-Key': 'fd4074fae1msh6b1818e765fa4bbp1324bajsn12b9c926a636',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };

  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        getIMDB(data.results);
    });
}



function getIMDB(results) {
  var title = [];
  var url = [];
  var genreButton = document.getElementsByClassName('genre');
  while(genreButton.length > 0){
    genreButton[0].remove();
  }
  
  for(var i = 0; i < results.length; i++){
    title[i] = results[i].original_title;
  }

  for(var i = 0; i < title.length; i++){
    url[i] = 'https://imdb8.p.rapidapi.com/title/find?q=' + title[i].replace(' ','%20');
  }

  console.log(url);

  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fd4074fae1msh6b1818e765fa4bbp1324bajsn12b9c926a636',
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
            listItem.setAttribute('onclick',"location.href='https://imdb.com"+data.results[0].id+"'");
            genreList.appendChild(listItem);
          });
          i++;
        }
        else {
          clearInterval(intv);
          i = 0;
        }
  }, 250);
}

function refreshPage(){
  window.location.reload();
} 

