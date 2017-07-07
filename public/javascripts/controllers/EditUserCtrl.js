app.controller("EditUserCtrl", function($location, $rootScope, $routeParams, $scope, AuthFactory, UserFactory) {

	$scope.userUpdate = {};

	let getUserInfo = () => {
		var userInfo = firebase.auth().currentUser;
			if (userInfo) {
			  $scope.userUpdate.email = userInfo.email;
			  $scope.userUpdate.username = userInfo.username;
			  $scope.userUpdate.profilePicURL = userInfo.profilePicURL;
			} else {
			  // No user is signed in.
			}

	   	UserFactory.getUser($rootScope.user.uid).then((user) => {
	      $scope.userUpdate.username = user.username;
	      $scope.userUpdate.profilePicURL = user.profilePicURL;

	    }).catch();
	};
    getUserInfo();
    
    
    $scope.updateUser = () => {
    	UserFactory.editEmail($scope.userUpdate.email);
		UserFactory.editUser($rootScope.user, $scope.userUpdate)
		.then((results) => {
		})
		.catch((error) => {
			console.log("update user error: ", error);
		});
    };
});