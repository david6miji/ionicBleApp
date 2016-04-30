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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('main', 			{ url: '/', 		templateUrl: 'views/main.html'    	, 		
	                                            controller: 'mainCtrl'			})
  
	$urlRouterProvider.otherwise('/');
  
})

;
	