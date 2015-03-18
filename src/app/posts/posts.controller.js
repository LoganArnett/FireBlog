'use strict'

angular.module('fireBlog')

.controller('PostsCtrl', function($firebaseObject, $firebaseArray, $stateParams, Fire, Auth){
    var self = this;
  /* Allows controller to check
  * if a user is logged in and
  * use their info on the page
  */
    Auth.onAuth(function(user){
        self.user = user;
        if (user === null ){
          console.log('No Current User')
        }
        else {
          console.log(user.$id)
        }
    });  
    
    var postList = new Firebase(Fire.Base.Url + '/Users/' + $stateParams.id + '/posts/' + $stateParams.postId)
    this.blog = $firebaseObject(postList)
    
    this.blog.$loaded().then(function(post){
        self.content = post.content;
    })
    
    
    

})