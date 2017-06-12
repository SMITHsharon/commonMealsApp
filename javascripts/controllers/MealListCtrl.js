app.controller("MealListCtrl", function($rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.meals = [];
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.thisUser = {};


	let getUserInfo = () => {
		// var userInfo = firebase.auth().currentUser;
		// 	if (userInfo) {
		// 	  $scope.thisUser.username = userInfo.username;
		// 	} else {
		// 	  // No user is signed in.
		// 	}

	   	UserFactory.getUser().then((user) => {
	   	// UserFactory.getUser($rootScope.user.uid).then((user) => {
console.log("user :: ", user);
console.log("user.username :: ", username);
	      $scope.thisUser.username = user.username;

	    }).catch();
	};
    getUserInfo();


    let getMeals = () => {
 		// calling getUser to get the userId is technically better then using $rootScope
		SchedulingFactory.getMealList($rootScope.user.uid).then((mealz) => {
		  $scope.meals=mealz;
		  // for loop :: get cook team
		  
		}).catch((error) => {
		  console.log("get Meals", error);
		});
	};
	getMeals();

});
