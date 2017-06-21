app.controller("MealEditCtrl", function($location, $routeParams, $rootScope, $scope, SchedulingFactory, UserFactory, CookTeamFactory) {

	$scope.thisMeal = {};
	$scope.newMeal ={};
	$scope.members = [];
	$scope.selectedMembers = []; // checked=true for Cook Team
	$scope.cooks = [];
	$scope.currentPath = $location.path();


	SchedulingFactory.getSingleMeal($routeParams.id)
		.then((results) => {
			results.data.deadline = new Date(results.data.deadline);
			results.data.mealDate = new Date(results.data.mealDate);
	  		$scope.newMeal = results.data;
	  		$scope.thisMeal = results.data;
			CookTeamFactory.getCookTeam($routeParams.id)
			.then((cookNamez) => {
				$scope.cooks = cookNamez;
			});
		 })
		 .catch((error) => {
		 	console.log("error on getSingleMeal", error);
  		 });


	$scope.addNewMeal = () => {
		$scope.newMeal.uid = $rootScope.user.uid;
		SchedulingFactory.editMeal($scope.newMeal)
		.then((postedMeal) => {
			let mealId = postedMeal.data.name;
			$scope.selectedMembers.forEach((thisMember) => {
				CookTeamFactory.assignCook(mealId, thisMember)
				.then((resolve) => {
				})
				.catch((error) => {
					console.log(error);
				});
			});
		$location.url('/meals/list');
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
