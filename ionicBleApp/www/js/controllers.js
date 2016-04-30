angular.module('starter.controllers', [])

.controller('navCtrl', function($scope, $ionicHistory) {
   $scope.goBack = function() {
      $ionicHistory.goBack();
   };
})

.controller('mainCtrl', function($scope,$ionicPlatform) {

    $scope.items = [
//		{ title : "제목"    		, url : "#/title" 		},

	];
	
	$ionicPlatform.ready(function() {
		console.log( 'CALL $ionicPlatform.ready()');
		if( !window.ble ){
			console.log( 'INFO No support ble');
			return;
		} 
		
		console.log( 'CALL ble.startScan()' );
		ble.scan([], 5,
				function(peripheral){
					console.log("peripheral = " + (JSON.stringify(peripheral, null, 4)));	
				},
				function(error){
					console.log("error = " + (JSON.stringify(error, null, 4)));	
				});
		
	});	

})

;

