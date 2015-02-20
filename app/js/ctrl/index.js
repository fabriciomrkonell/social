'use strict';

angular.module("app", []);

angular.module("app").controller("ctrl-index", ['$scope', '$http', function($scope, $http){

	angular.extend($scope, {
		data: {
			name: '',
			email: '',
			password: ''
		},
		login: {
			email: '',
			password: ''
		}
	});

	function login(email, password){
		$http.post('/login', { username: email, password: password }).success(function(data){
			if(data.success == 1){
				window.location = '/';
			}else{
				alert("uSuário inválido");
			}
    });
	};

	$scope.login = function(){
		login($scope.login.email, $scope.login.password);
	};

	$scope.save = function(){
		$http.post('/user', $scope.data).success(function(data){
			if(data.success == 1){
				login(data.user.email, data.user.password);
			}else{
				alert(data.message);
			}
		}).error(function(data){
			console.log(data);
		});
	};

}]);