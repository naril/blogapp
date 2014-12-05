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

blogApp.filter('to_trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);

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
      var obj = {};
      obj.jmeno = $scope.nameVal;
      obj.text = $scope.textVal;
      $http.post('http://netnode.eu/api/clanky/clanek/'+ $routeParams.id +'/komentare/add', JSON.stringify(obj)).success(function() {
			 $scope.comments.push({jmeno : $scope.nameVal, text: $scope.textVal});
        $scope.nameVal = "";
        $scope.textVal = "";
      });
      }
		}
}]);

blogApp.controller('aboutCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('http://netnode.eu/api/section/about').success(function(data){ 
    $scope.sekce = JSON.parse(data);
  });
}]);

blogApp.controller('blogCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.clanky = [];

  $scope.getNumber = function (num) {
  	var i = 1;
  	var a = [];
  	for(;i<num;i++)
  		a.push(i);
  	return a; 
  }

  $http.get('http://netnode.eu/api/clanky').success(function(data){ 
     for(var i=0;i < data.length; i++)
      $scope.clanky.push(JSON.parse(data[i]));
  });

  $scope.preview = function (id) {
    return $scope.clanky[id-1].text.substring(0, $scope.clanky[id-1].text.length/10);
  }

}]);

blogApp.controller('contactCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('http://netnode.eu/api/section/contact').success(function(data){ 
    $scope.sekce = JSON.parse(data);
  });
}]);
