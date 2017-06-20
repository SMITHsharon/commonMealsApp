app.controller("MealAddCtrl", function($http, $location, $q, $rootScope, $scope, FIREBASE_CONFIG, SchedulingFactory, UserFactory, CookTeamFactory) {

	$scope.members = [];
	$scope.selectedMembers = []; // checked=true for Cook Team
	$scope.meals = [];
	$scope.newMeal ={};
	$scope.currentPath = $location.path();

	$scope.addNewMeal = () => {
		$scope.newMeal.uid = $rootScope.user.uid;
		SchedulingFactory.postNewMeal($scope.newMeal)
		.then((postedMeal) => {
			let mealId = postedMeal.data.name;
			$scope.selectedMembers.forEach((thisMember) => {
				CookTeamFactory.assignCook(mealId, thisMember)
				.then((resolve) => {
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
		})
		.catch((error) => {
			console.log("error on getMemberList", error);
		});
	};
	getMembers();


	$scope.toggleSelection = function toggleSelection(memberId) {

	    let idx = $scope.selectedMembers.indexOf(memberId);
	    if (idx > -1) {
	      $scope.selectedMembers.splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.selectedMembers.push(memberId);
	    }
	  };

});
