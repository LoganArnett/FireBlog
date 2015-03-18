'use strict';

angular.module('fireBlog', ['ngAnimate', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'firebase', 'yaru22.md'])
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    
    RestangularProvider.setBaseUrl('https://api.github.com/repos/loganarnett/LoganArnett.github.io/contents/_posts/');
    
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
      })
      .state('home.list', {
        url: '/list',
        templateUrl: 'app/posts/list.html',
        controller: 'NewPostCtrl as new'
      })
      .state('post', {
        url: '/post/:id/:postId',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsCtrl as post'
      })
      .state('newpost', {
        url: '/newposts',
        templateUrl: 'app/posts/newpost.html',
        controller: 'NewPostCtrl as new'
    })

    $urlRouterProvider.otherwise('/home');
  })
  .constant('Fire', {
    Base: {
        Url: 'https://rapidfireblog.firebaseio.com'
    }
})
;