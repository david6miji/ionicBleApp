angular.module('starter.controllers')

.controller('mainCtrl', 
function( $rootScope, $scope,$interval,$ionicPlatform,$cordovaBluetoothLE,BLE,$state,$ionicHistory) {

	$scope.bleEnabled  	= true;
	
	var interval_handle;

	$scope.start = function(){
		if ( angular.isDefined(interval_handle) ) return;
		
		interval_handle = $interval( function (){
			$cordovaBluetoothLE.isEnabled().then(function(obj) {
//				console.log("Is Enabled Success : " + JSON.stringify(obj));
				BLE.isEnabled = obj.isEnabled;
				$scope.bleEnabled = BLE.isEnabled;				
			});
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
		
		$cordovaBluetoothLE.initialize().then(null, 
		function(obj) {
			//Should only happen when testing in browser
			console.log("Initialize Error : " + JSON.stringify(obj)); 
			// obj = {"message":"Bluetooth not enabled","status":"disabled"}
		}, function(obj) {
			console.log("Initialize Success : " + JSON.stringify(obj));
			// obj = {"status":"enabled"}
			if( obj.status === "enabled" ){
				BLE.isEnabled = true;
			} else {
				BLE.isEnabled = false;
			}
			
			$scope.bleEnabled = BLE.isEnabled;
			$scope.start();
		});		
		
	});	
	
	$scope.$on('$destroy', function() {
		console.log( 'main :EVENT destroy()');
		$scope.stop();
	});
	
})

;

