/*jshint loopfunc: true */
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
			SignUpFactory.deletzSignUp(signUpId)
			.then(() => {
				$location.url("/meals/list");
			})
			.catch((error) => {
			console.log("error on deleteSignUp", error);
			});
		}
	};


	// function provides the conditional based on deadline, 
	// whether to show the <Sign Up> button
	$scope.isAfterDeadline = (meal) => {
		let currentDate = new Date();
		return moment(meal.deadline).isAfter(moment(currentDate));
	};

});
