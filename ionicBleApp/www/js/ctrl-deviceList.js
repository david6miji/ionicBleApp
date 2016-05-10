angular.module('starter.controllers')

.controller('deviceListCtrl', function($scope,$timeout, $state,$cordovaBluetoothLE ) {
	
	$scope.scanning = false;
	$scope.devices 	= {};
	
	$scope.bleScan = function(){
		
		console.log( 'scan start');
		
		var params = {
			services:[],
			allowDuplicates: false,
			scanTimeout: 15000,
		};
	
		$scope.devices = {};
		
		$cordovaBluetoothLE.startScan(params).then(
		
			function(obj) {
				console.log("Start Scan Auto Stop : " + JSON.stringify(obj));
				if( obj.status === "scanStopped" ){
					$scope.scanning = false;
				}
				
			}, function(obj) {
				
				console.log("Start Scan Error : " + JSON.stringify(obj));
				
			}, function(obj) {
				
				console.log("Start Scan Success : " + JSON.stringify(obj));

				if( obj.status === "scanStarted" ){
					$scope.scanning = true;
				}
				
				if( obj.status === "scanResult" ){
						$scope.devices[obj.address] = {};
						$scope.devices[obj.address].id 		= obj.address;
						$scope.devices[obj.address].name 	= obj.name;
						$scope.devices[obj.address].rssi 	= obj.rssi;
				}
			}
		);
		
	}

	$scope.bleScanStop = function(){
		console.log('scan stop')
		$cordovaBluetoothLE.stopScan().then(
			function(obj) {
				console.log("Stop Scan Success : " + JSON.stringify(obj));
				$scope.scanning = false;
			}, function(obj) {
				console.log("Stop Scan Error : " + JSON.stringify(obj));
				$scope.scanning = false;
			}
		);
	
	}
	
	$scope.$on('$destroy', function() {
		console.log( 'EVENT destroy()');
		$scope.bleScanStop();
		
	});
	
	$scope.select = function( device ){
		$scope.bleScanStop();
//		$state.go( 'device', { id : device.id, name : device.name } );
//		$state.go( 'device', { device : device } );
	}
	
})

;

