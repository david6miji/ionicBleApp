angular.module('starter.controllers')

.controller('mainCtrl', 
function( $rootScope, $scope,$interval,$ionicPlatform,BLE,$state,$ionicHistory) {

	$scope.bleEnabled  	= true;
	
	var interval_handle;

	$scope.start = function(){
		if ( angular.isDefined(interval_handle) ) return;
		
		interval_handle = $interval( function (){
			ble.isEnabled(
				function() {
					BLE.isEnabled = true;
					$scope.bleEnabled = BLE.isEnabled;
				},
				function() {
					BLE.isEnabled = false;
					$scope.bleEnabled = BLE.isEnabled;
				}
			);
			
		},500);
	};
  
	$scope.stop = function(){
		if (angular.isDefined(interval_handle)) {
            $interval.cancel(interval_handle);
            interval_handle = undefined;
        }		
	};
	
	$scope.enterDeviceList = function(){
		$state.go( 'device list' );
	};
	
	$ionicPlatform.ready(function() {
		if( !window.ble ){
			console.log( 'INFO No support ble');
			return;
		} 
		
		$scope.start();
		
	});	
	
	$scope.$on('$destroy', function() {
		console.log( 'main :EVENT destroy()');
		$scope.stop();
	});
	
})

;

