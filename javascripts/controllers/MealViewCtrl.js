app.controller("MealViewCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];

	let mealId = $routeParams.id;


	SchedulingFactory.getSingleMeal(mealId)
		.then((results) => {
	  		$scope.thisMeal = results.data;
	  		// getCooks($scope.meals[i].id);
			CookTeamFactory.getCookTeam(mealId)
			.then((cookNamez) => {
				$scope.cooks = cookNamez;

				getSignUpList(mealId);
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


	$scope.thisUserSignedUp = () => {
console.log("$rootScope.user.uid, $scope.signUps.memberId :: ", $rootScope.user.uid, $scope.signUps.memberId);
		for (let i=0; i<$scope.signUps.length; i++) {
			if ($rootScope.user.uid === $scope.signUps.memberId) {
				return true;
			} 
		}
		// current user is not signed up 
		return false;
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
