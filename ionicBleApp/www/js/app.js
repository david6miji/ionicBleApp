angular.module('starter', ['ionic', 'ngCordova','starter.controllers'])

.run(function($ionicPlatform) {
	
  $ionicPlatform.ready(function() {
	  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	// just checking if the BLE plugin works
    ble.isEnabled(
        function() {
            console.log("Bluetooth is enabled");
        },
        function() {
            console.log("Bluetooth is *not* enabled");
            alert("Bluetooth is *not* enabled");
        }
    );
	
  });
})

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('main', 			{ url: '/', 		templateUrl: 'views/main.html'    	, 		
	                                            controller: 'mainCtrl'			})
  
	$urlRouterProvider.otherwise('/');
  
})

;
	