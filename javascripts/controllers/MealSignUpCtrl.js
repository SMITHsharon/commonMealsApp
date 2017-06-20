app.controller("MealSignUpCtrl", function($http, $location, $q, $routeParams, $rootScope, $scope, FIREBASE_CONFIG, SignUpFactory, SchedulingFactory, CookTeamFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.newSignUp = {};

	let mealId = $routeParams.id;

	SchedulingFactory.getSingleMeal(mealId)
		.then((results) => {
	  		$scope.thisMeal = results.data;
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


	$scope.addNewSignUp = () => {
		$scope.newSignUp.memberId = $rootScope.user.uid;
	    $scope.newSignUp.mealId = $routeParams.id;
	    SignUpFactory.postNewSignUp($scope.newSignUp)
	    .then((response) => {
	    	$scope.newSignUp = {};
	    	$location.url("/meals/list");
	    }).catch((error) => {
	    	console.log("error on addNewSignUp", error);
	    });
	};

});
