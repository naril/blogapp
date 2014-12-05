var blogApp = angular.module('blogApp', ['ngRoute', 'ngAnimate']);

blogApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'view/about.html',
        controller: 'aboutCtrl'
      })
      .when('/blog', {
        templateUrl: 'view/blog.html',
        controller: 'blogCtrl'
      }).when('/contact', {
        templateUrl: 'view/contact.html',
        controller: 'contactCtrl'
      }).when('/article/:id', {
      	templateUrl: 'view/clanek.html',
      	controller: 'articleCtrl'
      }).otherwise({
        redirectTo: '/blog'
      });
 	}
]);

blogApp.controller('articleCtrl', ['$scope', '$routeParams', '$http' ,  function ($scope, $routeParams, $http) {
	$scope.nameVal = "";
	$scope.textVal = "";
  $scope.comments = [];
  $scope.clanek = [];

	$scope.id = $routeParams.id;

  //komentare
  $http.get('http://netnode.eu/api/clanky/clanek/'+ $routeParams.id +'/komentare').success(function(data){ 
    for(var i=0;i < data.length; i++)
      $scope.comments.push(JSON.parse(data[i]));
  });

  //clanek
  $http.get('http://netnode.eu/api/clanky/clanek/'+ $routeParams.id).success(function(data){ 
    $scope.clanek = JSON.parse(data);
  });

	$scope.addComment = function() {
		if($scope.nameVal != "" && $scope.textVal != "") {
    //  data = JSON.stringify({jmeno : $scope.nameVal, text: $scope.textVal});
   //   console.log(data);
      $http.post('http://netnode.eu/api/clanky/clanek/'+ $routeParams.id +'/komentare/add', JSON.stringify({jmeno : $scope.nameVal, text: $scope.textVal}));
		//	$scope.comments.push({'name' : $scope.nameVal, 'text': $scope.textVal});
			$scope.nameVal = "";
			$scope.textVal = "";
		}
	}
}]);

blogApp.controller('aboutCtrl', ['$scope', function ($scope) {

}]);

blogApp.controller('blogCtrl', ['$scope', function ($scope) {
  $scope.getNumber = function (num) {
  	var i = 1;
  	var a = [];
  	for(;i<num;i++)
  		a.push(i);
  	return a; 
  }
	$scope.pageClass = 'ng-enter';
}]);

blogApp.controller('contactCtrl', ['$scope', function ($scope) {
	
}]);
