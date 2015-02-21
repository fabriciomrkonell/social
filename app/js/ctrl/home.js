'use strict';

angular.module("app", ['ngAnimate']);

angular.module("app").config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push(function(){
  	return {
  		'response': function(response) {
  			if(response.data.success == 2){
  				window.location = '/';
  			}
  			return response;
    	}
  	};
	});
}]);

angular.module("app").controller("ctrl-home", ['$scope', '$http', function($scope, $http){

	angular.extend($scope, {
		message: '',
		data: {
			user: { }
		}
	});

	$scope.write = function(){
		$http.post("/write", { message: $scope.message }).success(function(data){
			$scope.message = "";
			console.log(data);
		});
	};

	$scope.disabledWrite = function(message){
		if(message.length > 0){
			return false;
		}
		return true;
	}

	$(document).click(function(){
		$('#menu-user').popover('hide');
	});

	$('#menu-user').popover({
		html: true,
		placement: 'bottom',
		content: '<a class="menu-close-link" href="/logout">Sair</a>'
	});

}]);