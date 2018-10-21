(function(){
	'use strict';
	var app = angular.module('app',['ui.router', 'ngCookies','ngAnimate']);
	
	var config,run;
	config.$inject = ['$stateProvider', '$urlRouterProvider']
	
	app.config(config);

	function config($stateProvider, $urlRouterProvider){
		console.log("config init");
		$stateProvider
			.state('home',{
				url:'/',
				controller: 'ProjectController',
				templateUrl: 'app/project/main.view.html',
			})
		    
		 $urlRouterProvider.otherwise('/');
	}


})();
