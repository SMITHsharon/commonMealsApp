app.controller("MealListCtrl", function($location, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory, UserFactory) {


	$scope.meals = [];
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.thisUser = {};
	$scope.CurrentDate = {};


	let getUserInfo = () => {

	   	UserFactory.getUser($rootScope.user.uid).then((user) => {
	    	$scope.thisUser.username = user.username;
	    	$scope.thisUser.userId = user.uid;
	    }).catch();
	};


    let getMeals = () => {

    	getUserInfo(); // displays user's name on screen

		SchedulingFactory.getMealList().then((mealz) => {
			$scope.meals=mealz;

			// get meals current user is signed-up for
			getUserSignUps($scope.thisUser.userId); 

			for (let i=0; i<$scope.meals.length; i++) {

				$scope.meals[i].signedUp = false;

				// get Cook Team for each Meal
				CookTeamFactory.getCookTeam($scope.meals[i].id)
				.then((cookNamez) => {
					$scope.meals[i].cookNames = cookNamez;

					// get if current user is signed up for this meal 
					for (let j=0; j<$scope.signUps.length; j++) {
						if ($scope.meals[i].id === $scope.signUps[j].mealId) {
							$scope.meals[i].signedUp = true;
						}
					}
				})
				.catch((error) => {
					console.log("error on getCookTeam", error);
				});
			}

		}).catch((error) => {
		  console.log("error on getMeals", error);
		});
	};
	getMeals();


	let getUserSignUps = (userId) => {
		SignUpFactory.getUserSignUpz(userId)
		.then((signUpz) => {
			signUpz.forEach((signUp) => {
				$scope.signUps.push(signUp);

			});	
			console.log($scope.signUps);
		})
		.catch((error) => {
			console.log("error on getUserSignUps", error);
		});
	};


	let deleteSignUp = (mealId) => {
console.log("in deleteSignUp");
		let userSignUps = getUserSignUps($scope.thisUser.userId);
console.log("mealId // userSignUps :: ", mealId, userSignUps);
		for (let i=0; i<userSignUps.length; i++) {
			if (userSignUps[i].mealId === mealId) {
console.log("userSignUps[i].mealId; mealId; i ::", i, userSignUps[i].mealId, mealId);
				SignUpFactory.deletzSignUp(mealId);
			}
			$location.url("/meals/list");
		}
	};


	// function provides the conditional based on deadline, 
	// whether to show the <Sign Up> button
	$scope.isAfterDeadline = (meal) => {
		let currentDate = new Date();
		return moment(meal.deadline).isAfter(moment(currentDate));
	};

});
