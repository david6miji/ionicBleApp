angular.module('starter.controllers')

.controller('deviceCtrl', function( $stateParams, $scope,$interval ) { 
	
	$scope.device = {};
	$scope.device.id 	= $stateParams.device.id;
	$scope.device.name 	= $stateParams.device.name;
	$scope.device.rssi 	= $stateParams.device.rssi;
	$scope.device.isConnected  = false;
	
	var interval_handle;

	interval_handle = $interval( function (){
		
		ble.isConnected( $scope.device.id, 
			function(){
				// success
				console.log( 'connected' );
				$scope.device.isConnected  = true;
//				$scope.$apply();
			},function(){
				//failure
				console.log( 'disconnect' );
				$scope.device.isConnected  = false;
//				$scope.$apply();
			}
		);
		
		ble.readRSSI( $scope.device.id,
			function(rssi){
				// success
				$scope.device.rssi = rssi;
			},function(err){
				//failure
				$scope.device.rssi = 0;
			}
		);
			
	},500);
	
	var rssiSample;
	$scope.connectDevice = function() {
		ble.connect( $scope.device.id, 
			function( data ){
			// connectSuccess
				console.log( 'connected peripheral = ' + JSON.stringify(data, null, 4));
//				rssiSample = $interval(function() {
//					ble.readRSSI($scope.device.id, function(rssi) {
//                        console.log('read RSSI',rssi,'with device', device_id);
//                    }, function(err) {
//                        console.error('unable to read RSSI',err);
//                        clearInterval(rssiSample);
//                        })
//				}, 5000);
				
			
			}, function( error ){
			// connectFailure	
				console.log( 'connected error = ' + JSON.stringify(error, null, 4));
			}
		);
	
	}

	$scope.disconnectDevice = function() {
	
	}
	
	$scope.$on('$destroy', function() {
		if (angular.isDefined(interval_handle)) {
            $interval.cancel(interval_handle);
            interval_handle = undefined;
        }		
	});	
})

;

