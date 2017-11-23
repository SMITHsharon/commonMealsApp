/*jshint loopfunc: true */
app.controller("MealListCtrl", function($location, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory, UserFactory) {


	$scope.meals = [];
	var tempMeals = [];
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.thisUser = {};
	$scope.CurrentDate = {};


	let getUserInfo = () => {

	   	UserFactory.getUser($rootScope.user.uid).then((user) => {
	    	$scope.thisUser.username = user.username;
	    	$scope.thisUser.userId = user.uid;
	    	$scope.thisUser.profilePicURL = user.profilePicURL;
	    }).catch();
	};


    let getMeals = () => {

    	getUserInfo(); // displays user's name on screen

		SchedulingFactory.getMealList().then((mealz) => {
			// store returned mealz data in temp var before scoping to DOM
			// allows for proper filtering for Sign-Ups
			tempMeals = mealz;

			// get meals current user is signed-up for
			getUserSignUps($scope.thisUser.userId); 

			for (let i=0; i<tempMeals.length; i++) {

				// get Cook Team for each Meal
				CookTeamFactory.getCookTeam(tempMeals[i].id)
				.then((cookNamez) => {
					tempMeals[i].cookNames = cookNamez;

					// get if current user is signed up for this meal 
					tempMeals[i].signedUp = false;
					for (let j=0; j<$scope.signUps.length; j++) {
						if (tempMeals[i].id == $scope.signUps[j].mealId) {
							tempMeals[i].signedUp = true;

							// write the screen before overwriting $scope.meals[i].signedUp
							break; 
						}
						else {
							tempMeals[i].signedUp = false;
						}
					}
					// write the mealz data to the DOM, filtered according to Sign-Ups
					$scope.meals = tempMeals;
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
		})
		.catch((error) => {
			console.log("error on getUserSignUps", error);
		});
	};


	$scope.deleteMeal = (mealId) => {
		SchedulingFactory.deletzMeal(mealId)
		.then(() => {
			$location.url('/meals/list');
		})
		.catch((error) => {
			console.log("error on deleteMeal", error);
		});
	};


	$scope.deleteSignUp = (mealId) => {
		let signUpId = -1;
		for (let i=0; i<$scope.signUps.length; i++) {
			if ($scope.signUps[i].mealId === mealId) {
				signUpId = $scope.signUps[i].id;
			}
		}
		SignUpFactory.deletzSignUp(signUpId)
		.then(() => {
			$scope.meals = {};
			getMeals();
		})
		.catch((error) => {
		console.log("error on deleteSignUp", error);
		});
		
	};


	// function provides the conditional based on deadline, 
	// whether to show the <Sign Up> button
	$scope.isAfterDeadline = (meal) => {
		let currentDate = new Date();
		return moment(meal.deadline).isAfter(moment(currentDate));
	};

});
