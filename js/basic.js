var figure = function(){
	$http.jsonp("http://localhost:8888", {
		params: {
			callback: 'JSON_CALLBACK',
		}
	}).success(function(data) {
		var things = data.data.billboards;
		for(i = 0; i < things.length; i++){
			$scope.pics = $scope.pics.concat(things[i].imageUrl);
		}
	})
}

var loadMore = function(){
	$http.jsonp("http://localhost:8899", {
		params: {
			callback: 'JSON_CALLBACK',
		}
	}).success(function(data) {
		console.log(data);
		var movies = data.data.films;
		for(i = 0; i < movies.length; i++){
			$scope.posters = $scope.posters.concat(movies[i].cover.origin);
			$scope.name = $scope.name.concat(movies[i].name);
			$scope.cinemaCount = $scope.cinemaCount.concat(movies[i].cinemaCount);
			$scope.watchCount = $scope.watchCount.concat(movies[i].watchCount);
			$scope.grade = $scope.grade.concat(movies[i].grade);
		}
	})
}

var loadMoreComing = function(){
	$http.jsonp("http://localhost:8877", {
		params: {
			callback: 'JSON_CALLBACK',
		}
	}).success(function(data) {
		console.log(data);
		var c_movies = data.data.films;
		for(i = 0; i < c_movies.length; i++){
			$scope.c_posters = $scope.c_posters.concat(c_movies[i].cover.origin);
			$scope.c_name = $scope.c_name.concat(c_movies[i].name);
			$scope.c_premiereAt = $scope.c_premiereAt.concat(new Date(c_movies[i].premiereAt).toLocaleString().replace(/:\d{1,2}$/,' '));
		}
	})
}