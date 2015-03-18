'use strict'

angular.module('fireBlog')

.controller('NewPostCtrl', function($firebaseObject, $firebaseArray, Fire, Auth, Restangular){
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
    
    var postList = new Firebase(Fire.Base.Url + '/Users/' + self.user.$id + '/posts')
    
    this.blogPost = $firebaseArray(postList)
    console.log(this.postArray)
// This defaults the form to empty
    this.newPost = {
        title: '',
        image: '',
        content: '',
        date: Date.now(),
    }
/* This function allows us to send 
 * our new post to firebase to use
 * later and display
 */
    this.publish = function(post){
        this.blogPost.$add(post)
 // And resets the form       
        return this.newPost = {
            title: '',
            image: '',
            content: '',
            date: Date.now(),
        }
    }
//    customPUT()
    this.gitPub = function(post){
      console.log(post.content)
    }
})