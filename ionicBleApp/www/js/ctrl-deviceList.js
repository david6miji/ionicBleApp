angular.module('starter.controllers')

.controller('deviceListCtrl', function($scope,$timeout ) {
	
	$scope.scanning = false;
	$scope.devices 	= [];
	$scope.keys 	= {};
	var bleScanTimer;
	
	$scope.bleScan = function(){
		
		console.log( 'scan start');
		$scope.scanning = true;
		$scope.devices = [];
		
		bleScanTimer = $timeout(function() {
			ble.stopScan();
			$scope.scanning = false;
			console.log('scan stop')
		}, 10000);
		
		ble.startScan([],  /* scan for all services */
			function(peripheral){
				console.log( 'peripheral = ' + JSON.stringify(peripheral, null, 4));
                $scope.devices.push(peripheral);
				$scope.keys[peripheral.id] = peripheral;
				$scope.$apply();
            },
            function(error){
				console.error( error );
            }
		);
	}

	$scope.$on('$destroy', function() {
		console.log( 'EVENT destroy()');
		
		if ( angular.isDefined(bleScanTimer) ) {
			console.log('timer stop3');
			$timeout.cancel( bleScanTimer );
		}
		ble.stopScan();
	});
	
})

;

