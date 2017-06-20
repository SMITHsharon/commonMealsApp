app.controller("MealViewCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];

	let mealId = $routeParams.id;


	SchedulingFactory.getSingleMeal(mealId)
		.then((thizMeal) => {
	  		$scope.thisMeal = thizMeal.data;
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
	  			$scope.signUps = signUpz;
			})
			.catch((error) => {
			 	console.log("error on getSignUpList", error);
			});
	};


	$scope.thisUserSignedUp = () => {
		for (let i=0; i<$scope.signUps.length; i++) {
			if ($rootScope.user.uid === $scope.signUps.memberId) {
				return true;
			} 
		}
		// current user is not signed up 
		return false;
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


});
