'use strict';

angular.module("app", ['ngAnimate']);

angular.module("app").controller("ctrl-index", ['$scope', '$http', function($scope, $http){

	angular.extend($scope, {
		alertLogin: false,
		alertSave: false,
		messageSave: '',
		logon: {
			email: 'fabricioronchii@gmail.com',
			password: 'fabricio'
		},
		data: {
			name: '',
			email: '',
			username: '',
			password: ''
		}
	});

	function login(email, password){
		$http.post('/api/login', { username: email, password: password }).success(function(data){
			if(data.success == 1){
				window.location = '/';
			}else{
				$scope.alertLogin = true;
				angular.extend($scope.logon, {
					email: '',
					password: ''
				});
			}
    });
	};

	$scope.login = function(){
		login($scope.logon.email, $scope.logon.password);
	};

	$scope.show = function(){
		$scope.alertLogin = false;
		$scope.alertSave = false;
	};

	$scope.save = function(){
		$http.post('/api/user', $scope.data).success(function(data){
			if(data.success == 1){
				login(data.user.email, data.user.password);
			}else if(data.success == 0){
				$scope.messageSave = data.message;
				$scope.alertSave = true;
				document.getElementById(data.field).focus();
			}else{
				$scope.messageSave = data.message;
				$scope.alertSave = true;
			}
		});
	};

}]);