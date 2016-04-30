angular.module('starter.controllers', [])

.controller('navCtrl', function($scope, $ionicHistory) {
   $scope.goBack = function() {
      $ionicHistory.goBack();
   };
})

.controller('mainCtrl', function($scope) {

    $scope.items = [
//		{ title : "제목"    		, url : "#/title" 		},

	];

})

.controller('sample1Ctrl', function($scope) {
})

.controller('sample2Ctrl', function($scope, $ionicHistory) {
})

;

