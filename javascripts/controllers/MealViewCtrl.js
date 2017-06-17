app.controller("MealViewCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];


	SchedulingFactory.getSingleMeal($routeParams.id)
		.then((results) => {
	  		$scope.thisMeal = results.data;
	  		// getCooks($scope.meals[i].id);
			CookTeamFactory.getCookTeam($routeParams.id)
			.then((cookNamez) => {
				$scope.cooks = cookNamez;

				getSignUpList($routeParams.id);
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
	



	$scope.deleteMeal = (mealId) => {

		// deleteCookTeam(mealId);

console.log("$scope.signUps to loop through for delete:: ", $scope.signUps);
		for (let i=0; i<$scope.signUps.length; i++) {
			// if ($scope.signUp !== null ) {
				if (mealId === $scope.signUps[i].mealId) {
console.log("$scope.signUps[i].id :: ", $scope.signUps[i].id);
					SignUpFactory.deletzSignUp($scope.signUps[i].id)
					.then(() => {

					})
					.catch((error) => {
						console.log("error on deletzSignUp", error);
					});
				}
			// }
		}
		
		// delete Meal
		SchedulingFactory.deletzMeal(mealId).then(() => {
console.log("returned from deletzMeal");
			// $location.url('/meals/list');
		}).catch((error) => {
			console.log("error on deleteMeal", error);
		});
	};


});
