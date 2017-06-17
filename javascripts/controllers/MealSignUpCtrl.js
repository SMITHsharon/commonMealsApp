app.controller("MealSignUpCtrl", function($http, $location, $q, $routeParams, $rootScope, $scope, FIREBASE_CONFIG, SignUpFactory, SchedulingFactory, CookTeamFactory) {

	$scope.thisMeal = {};
	$scope.cooks = [];
	$scope.signUps = [];
	$scope.newSignUp = {};


console.log("$routeParams.id :: ", $routeParams.id);
	let mealId = $routeParams.id;

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


	// $scope.addNewSignUp = (mealId) => {
	$scope.addNewSignUp = () => {
console.log("mealId in addNewSignUp", $routeParams.id);
		$scope.newSignUp.memberId = $rootScope.user.uid;
	    // $scope.newSignUp.mealId = mealId;
	    $scope.newSignUp.mealId = $routeParams.id;
console.log("$scope.newSignUp :: ", $scope.newSignUp);
	    SignUpFactory.postNewSignUp($scope.newSignUp)
	    .then((response) => {
	      $scope.newSignUp = {};
	      $location.url("/meals/list");
	    }).catch((error) => {
	      console.log("error on addNewSignUp", error);
	    });
	};

});