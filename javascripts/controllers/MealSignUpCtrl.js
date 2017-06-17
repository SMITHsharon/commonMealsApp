app.controller("MealSignUpCtrl", function($http, $location, $q, $routeParams, $rootScope, $scope, FIREBASE_CONFIG, SignUpFactory, SchedulingFactory, CookTeamFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];

console.log("$routeParams.id :: ", $routeParams.id);

	SchedulingFactory.getSingleMeal($routeParams.id)
		.then((results) => {
console.log("results upon return, getSingleMeal :: ", results);
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

});