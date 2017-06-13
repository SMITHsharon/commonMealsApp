app.controller("MealListCtrl", function($rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory, UserFactory) {


	$scope.meals = [];
	// $scope.cooks = [];
	$scope.cookNames = [];
	$scope.signUps = [];
	$scope.thisUser = {};
	$scope.cookNameString = "";

	let cooks = [];
	let memberName = "";


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


    let getMemberName = (memberId) => {
    	UserFactory.getMemberName(memberId)
    	.then((resultName) => {
    		console.log("memberName :: ", memberName);
    		memberName = resultName;
    		return memberName;
    	})
    	.catch((error) => {
    		console.log("error on getMemberName", error);
    	})
    };


    let getMeals = () => {
    	getUserInfo();
 		// calling getUser to get the userId is technically better then using $rootScope
		SchedulingFactory.getMealList().then((mealz) => {
			$scope.meals=mealz;
			// get cook team for each meal
			for (let i=0; i<$scope.meals.length; i++) {
				getCooks($scope.meals[i].id);
			}

			// get meals current user has signed-up for 
			getUserSignUps($rootScope.user.uid);
			
console.log("$scope.meals :: ", $scope.meals);

		}).catch((error) => {
		  console.log("error on getMeals", error);
		});
	};
	getMeals();


	let getCooks = (mealId) => {
		CookTeamFactory.getCookTeam(mealId)
		.then((cookz) => {
			cookz.forEach((cook) => {
				// $scope.cooks.push(cook);
				cooks.push(cook);
			});
console.log("cooks :: ", cooks);
			// for each cook, get cook name
			cooks.forEach((cook) => {
				$scope.cookNameString += getMemberName(cook.memberId);
			});
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
