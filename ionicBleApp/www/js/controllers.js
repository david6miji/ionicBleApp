angular.module('starter.controllers', [])

.controller('navCtrl', function($scope, $ionicHistory) {
   $scope.goBack = function() {
      $ionicHistory.goBack();
   };
})

;

