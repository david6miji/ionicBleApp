angular.module('starter', ['ionic', 'ngCordova','starter.controllers'])

.run(function($ionicPlatform,$ionicHistory, $ionicPopup) {
	
  $ionicPlatform.ready(function() {
	  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	if( window.powerManagement ){
		console.log( "OK window.powerManagement" );
		window.powerManagement.acquire(function() {
//			console.log('Wakelock acquired');
		}, function() {
//			console.log('Failed to acquire wakelock');
		});			
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
													// console.log('Wakelock released');
												}, function() {
													// console.log('Failed to release wakelock');
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
			$ionicHistory.goBack();
		}
			
	}, 101); 
		
})

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('main', 			{ url: '/', 		templateUrl: 'views/main.html'    	, 		
	                                            controller: 'mainCtrl'			})
  
	$urlRouterProvider.otherwise('/');
  
})

;
	