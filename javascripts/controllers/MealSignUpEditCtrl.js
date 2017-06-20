app.controller("MealSignUpEditCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.newSignUp = [];
	$scope.currentPath = $location.path();

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


	SignUpFactory.getSingleSignUp($rootScope.user.uid, mealId)
	.then((singleZignUp) => {
		$scope.newSignUp = singleZignUp;
	})
	.catch((error) => {
		console.log("error on getSingleSignUp", error);
	});


	$scope.addNewSignUp = () => {
		SignUpFactory.editSignUp($scope.newSignUp)
		.then(() => {
			$location.url('/meals/list');
		})
		.catch((error) => {
			console.log("error on editSignUp", error);
		});
	};

});
