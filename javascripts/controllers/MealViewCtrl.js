app.controller("MealViewCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];
	// $scope.keys = [];
	// $scope.thisUser = {};


// console.log("$routeParams.id :: ", $routeParams.id);
	SchedulingFactory.getSingleMeal($routeParams.id)
		.then((results) => {
console.log("results.data", results.data);
	  		$scope.thisMeal = results.data;
	  		// getCooks($scope.meals[i].id);
			CookTeamFactory.getCookTeam($routeParams.id)
			.then((cookNamez) => {
// console.log("cookNamez for this meal :: ", cookNamez);
				$scope.cooks = cookNamez;
			});
		 })
		 .catch((error) => {
		 	console.log("error on getSingleMeal", error);
  		 });



	let getSignUpList = (mealId) => {
		SignUpFactory.getSignUpzList(mealId)
			.then((signUpz) => {
	// console.log("signUpz", signUpz);
	  			$scope.signUps = signUpz;
	console.log("before return to deleteSignUps / $scope.signUps :: ", $scope.signUps);
			})
			.catch((error) => {
			 	console.log("error on getSignUpList", error);
			});
	};
	getSignUpList($routeParams.id);



// delete Meal :: also delete Cook Team members + delete Meal Sign-Ups
	let deleteCookTeam = (mealId) => {
		console.log("in deleteCookTeam");
	};


	let deleteSignUps = (mealId) => {
		// console.log("in deleteSignUps");
		$scope.signUps = getSignUpList(mealId);
		console.log("in deleteSignUps / $scope.signUps :: ", $scope.signUps);
	};


	$scope.deleteMeal = (mealId) => {

		deleteCookTeam(mealId);
		deleteSignUps(mealId);

		// delete Meal
		SchedulingFactory.deletzMeal(mealId).then(() => {
console.log("returned from deletzMeal");
			// $location.url('/meals/list');
		}).catch((error) => {
			console.log("error on deleteMeal", error);
		});
	};


});
