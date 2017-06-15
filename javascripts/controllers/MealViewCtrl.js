app.controller("MealViewCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];
	// $scope.keys = [];
	// $scope.thisUser = {};


console.log("$routeParams.id :: ", $routeParams);
	SchedulingFactory.getSingleMeal($routeParams.id)
		.then((results) => {
console.log("results.data", results.data);
	  		$scope.thisMeal = results.data;
	  		// getCooks($scope.meals[i].id);
			CookTeamFactory.getCookTeam($routeParams.id)
			.then((cookNamez) => {
console.log("cookNamez for this meal :: ", cookNamez);
				$scope.cooks = cookNamez;
			});
		 })
		 .catch((error) => {
		 	console.log("error on getSingleMeal", error);
  	});


	SignUpFactory.getSignUpList($routeParams.id)
		.then((signUpz) => {
console.log("signUpz", signUpz);
  			$scope.signUps = signUpz;
		})
		.catch((error) => {
		 	console.log("error on getSignUpList", error);
		});


	$scope.deleteMeal = (id) => {
		SchedulingFactory.deletz(id).then(() => {
			// delete Cook Team members
			// delete Sign-Ups 
			getMeals();
		}).catch((error) => {
			console.log("deleteMeal error", error);
		});
	};


});
