'use strict';

angular.module('fireBlog')
  .factory('Auth', function(Fire, $firebaseObject){
    var auth = new Firebase(Fire.Base.Url);
    console.log(auth)

  return {
    /**
    * Wrapper for `$firebaseAuth.$onAuth()` that filters the `auth` object
    * through the `updateUser()` function
    */
    onAuth: function(creds){
      auth.onAuth(function(data){
        creds(updateUser(data));
      });
    },
    /**
    * Wrapper for `$firebaseAuth.$authWithOAuthPopup()` that invokes the
    * correct provider code.
    */
    login: function(){
       return auth.authWithOAuthPopup("facebook", function(error, authData) {
            console.log(authData)
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Logged in as:", authData);
        }
      })
    },

    loggedIn: function(){
      if(auth.getAuth()){
        return true;
      }
    },
    /**
    * Wrapper for `$firebaseAuth.$unauth()`
    */
    logout: function(){
      auth.unauth();
    },
  }; // END service

  /**
  * Tranform the `authdUser` object from `$firebaseAuth` into a full User
  * record in the `/users` collection.
  *
  * @param {Object} authdUser from $firebaseAuth.getAuth()
  * @return {Object} from $firebase.$asObject()
  */
  function updateUser(authdUser){
    if ( authdUser === null ){
      return null;
    }

    /**
    * Create a reference to the users collection within Firebase
    * Then create a child of the users collection named after the
    * authdUser's Facebook ID
    */
    var user = auth.child('Users').child(authdUser.facebook.id);

    // Update the authdUser's information in Firebase
    user.update({
      uid: authdUser.facebook.id,
      facebook: authdUser.facebook,
      fullName: authdUser.facebook.displayName,
      firstName: authdUser.facebook.cachedUserProfile.first_name,
      lastName: authdUser.facebook.cachedUserProfile.last_name,
      avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
    });

    // Set user to the object reference of authdUser
    user = $firebaseObject(auth.child('Users').child(authdUser.facebook.id));

    return user;
   }
  }) // END Auth Factory

  .controller('MainCtrl', function (Auth, $firebaseObject, Fire) {
    var self = this;
    
 /* Allows controller to offer login
  * using the ng-click directive
  */
    this.login = Auth.login;
      
 /* Allows controller to offer logout
  * using the ng-click directive
  */
    this.logout = Auth.logout;
      
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
          console.log(user)
        }
    });

 /* Allows controller to ng-repeat
  * through your list of posts
  * *Todo: Convert Markdown to HTML*
  */
  var postList = new Firebase(Fire.Base.Url + '/' + self.user.uid + '/posts')
  
  this.posts = $firebaseObject(postList);
    
  }); //End Controller
