// app.controller("MealListCtrl", function($rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory, UserFactory) {
app.controller("MealListCtrl", function($rootScope, $scope, SchedulingFactory, SignUpFactory, UserFactory) {

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

	   	UserFactory.getUser($rootScope.user.uid).then((user) => {
	   	// UserFactory.getUser($rootScope.user.uid).then((user) => {
console.log("user :: ", user);
console.log("user.username :: ", user.username);
console.log("user.id :: ", user.id);
	      $scope.thisUser.username = user.username;
// $scope.thisUser.id = user.id;

	    }).catch();
	};
    // getUserInfo();


    let getMeals = () => {
    	getUserInfo();
 		// calling getUser to get the userId is technically better then using $rootScope
		SchedulingFactory.getMealList().then((mealz) => {
			$scope.meals=mealz;
			// get cook team for each meal
			// for (let i=0; i<$scope.meals.length; i++) {
			// 	getCooks($scope.meals[i].id);
			// }

			// get meals current user has signed-up for 
			getUserSignUps($rootScope.user.uid);
			
console.log("$scope.meals :: ", $scope.meals);

		}).catch((error) => {
		  console.log("getMeals", error);
		});
	};
	getMeals();


	let getCooks = (mealId) => {
		CookTeamFactory.getCookTeam(mealId)
		.then((cookz) => {
			cookz.forEach((cook) => {
				$scope.cooks.push(cook);
			});
console.log("cooks :: ", cooks);
			// for each cook, get cook name
		})
		.catch((error) => {
			console.log("error on getCooks", error);
		});
	};


	let getUserSignUps = (userId) => {
		SignUpFactory.getUserSignUpz(userId)
		.then((signUpz) => {
			signUpz.forEach((signUp) => {
				$scope.signUps.push(signUp);
			});		
console.log("$scope.signUps :: ", $scope.signUps);
		})
		.catch((error) => {
			console.log("error on getUserSignUps", error);
		});
	};

});
