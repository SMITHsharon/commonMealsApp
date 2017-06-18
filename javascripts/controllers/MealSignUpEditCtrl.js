app.controller("MealSignUpEditCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory) {

console.log("in MealSignUpEditCtrl");

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.newSignUp = [];

	$scope.currentPath = $location.path();
console.log("$location.path() :: ", $location.path());

console.log("$routeParams.id in MealSignUpEditCtrl :: ", $routeParams.id);
	let mealId = $routeParams.id;
console.log("mealId in MealSignUpEditCtrl :: ", mealId);

	SchedulingFactory.getSingleMeal(mealId)
		.then((results) => {
console.log("results upon return, getSingleMeal :: ", results);
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


	SignUpFactory.getSingleSignUp($rootScope.user.uid, mealId)
	.then((singleZignUp) => {
console.log("singleZignUp return :: ", singleZignUp);
		$scope.newSignUp = singleZignUp;
		// $scope.newSignUp = singleZignUp.data;
console.log("getSingleSignUp :: $scope.newSignUp :: ", $scope.newSignUp);
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