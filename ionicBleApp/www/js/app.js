angular.module('starter', ['ionic', 'ngCordova','starter.services','starter.controllers'])

.run(function($rootScope, $ionicPlatform,$ionicHistory, $ionicPopup,BLE,$state) {
	
  $ionicPlatform.ready(function() {
	  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	if( window.powerManagement ){
		window.powerManagement.acquire(function() {
		}, function() {
		});			
	}
	
  });
  
  $ionicPlatform.registerBackButtonAction(function () {
		var state_name = $ionicHistory.currentStateName();
		if( state_name == 'main' ) {
			
			var confirmPopup = $ionicPopup.confirm({
						title: '종료 확인',
						template: "FA-BLE를 종료 하시겠습니까?",
						buttons: [
									{ text: '취소' },
									{ text: '확인' ,  
									type: 'button-positive',
									onTap: function(event) {
											if( window.powerManagement ){
												window.powerManagement.release(function() {
												}, function() {
												});			
											}										
											
											ionic.Platform.exitApp();
											event.preventDefault();
											return false;
										}
									},
								]	
					});
					
		} else {
			console.log( 'no Main View Exit' );
			if( $ionicHistory.backView() ) {
				$ionicHistory.goBack();
			} else {
				$state.go( "main" );
			}
		}
			
	}, 101); 
		
})

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('main', 			{ url: '/', 			templateUrl: 'views/main.html'    	, 		
													controller: 'mainCtrl'					})
	.state('device list', 	{ url: '/device_list', 	templateUrl: 'views/device_list.html',
													controller: 'deviceListCtrl'			})
  
	$urlRouterProvider.otherwise('/');
  
})

;
	