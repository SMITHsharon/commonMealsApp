app.controller("MealEditCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, UserFactory, CookTeamFactory) {

	$scope.thisMeal = {};
	$scope.newMeal ={};
	$scope.members = [];
	$scope.selectedMembers = []; // checked=true for Cook Team
	$scope.cooks = [];
	// $scope.meals = [];
	// $scope.edit = true;
	$scope.currentPath = $location.path();


// console.log("$routeParams.id :: ", $routeParams.id);

	SchedulingFactory.getSingleMeal($routeParams.id)
		.then((results) => {
	  		$scope.newMeal = results.data;
	  		$scope.thisMeal = results.data;
	  		// getCooks($scope.meals[i].id);
			CookTeamFactory.getCookTeam($routeParams.id)
			.then((cookNamez) => {
console.log("cookNamez for this meal :: ", cookNamez);
				$scope.cooks = cookNamez;
// need cook team records to set Checkboxes true

// getSignUpList($routeParams.id);
			});
		 })
		 .catch((error) => {
		 	console.log("error on getSingleMeal", error);
  		 });


	// let getSignUpList = (mealId) => {
	// 	SignUpFactory.getSignUpzList(mealId)
	// 		.then((signUpz) => {
	// console.log("signUpz", signUpz);
	//   			$scope.signUps = signUpz;
	// console.log("before return to deleteSignUps / $scope.signUps :: ", $scope.signUps);
	// 		})
	// 		.catch((error) => {
	// 		 	console.log("error on getSignUpList", error);
	// 		});
	// };

	$scope.addNewMeal = () => {
		// calling getuser() better than using $rootScope ...
		$scope.newMeal.uid = $rootScope.user.uid;
		SchedulingFactory.editMeal($scope.newMeal)
		// .then((postedMeal) => {
		.then((postedMeal) => {
			// add Cook Team here; need the postedMeal id ???
console.log("postedMeal :: ", postedMeal);
			let mealId = postedMeal.data.name;
			$scope.selectedMembers.forEach((thisMember) => {
				CookTeamFactory.assignCook(mealId, thisMember)
// changes to Cook Team? 
				.then((resolve) => {
console.log("assignCook post / resolve :: ", resolve);
					$location.url("/meals/list");
				})
				.catch((error) => {
					console.log(error);
				});
			});
		})
		.catch((error) => {
			console.log("error on addNewMeal", error);
		});
	};


	let getMembers = () => {
		UserFactory.getMemberList()
		.then((memberz) => {
			$scope.members = memberz;
console.log("$scope.members :: ", $scope.members);
		})

		.catch((error) => {
			console.log("error on getMemberList", error);
		});
	};
	getMembers();


	$scope.toggleSelection = function toggleSelection(memberId) {
	    var idx = $scope.selectedMembers.indexOf(memberId);

	    // Is currently selected
	    if (idx > -1) {
	      $scope.selectedMembers.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selectedMembers.push(memberId);
	    }
	  };

});