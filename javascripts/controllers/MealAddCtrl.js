app.controller("MealAddCtrl", function($http, $location, $q, $rootScope, $scope, FIREBASE_CONFIG, SchedulingFactory, UserFactory, CookTeamFactory) {

	$scope.members = [];
	$scope.selectedMembers = []; // checked for Cook Team
	$scope.meals = [];
	$scope.newMeal ={};

	$scope.addNewMeal = () => {
		// calling getuser() better than using $rootScope ...
		$scope.newMeal.uid = $rootScope.user.uid;
		SchedulingFactory.postNewMeal($scope.newMeal)
		// .then((postedMeal) => {
		.then((postedMeal) => {
			// add Cook Team here; need the postedMeal id ???
// console.log("postedMeal :: ", postedMeal);
			let mealId = postedMeal.data.name;
			$scope.selectedMembers.forEach((thisMember) => {
				CookTeamFactory.assignCook(mealId, thisMember)
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
	// }]);


});