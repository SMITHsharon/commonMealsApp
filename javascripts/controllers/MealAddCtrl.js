app.controller("MealAddCtrl", function($http, $location, $q, $rootScope, $scope, FIREBASE_CONFIG, SchedulingFactory, UserFactory, CookTeamFactory) {

	$scope.members = [];
	$scope.meals = [];

	$scope.addNewMeal = () => {
		// calling getuser() better than using $rootScope ...
		$scope.newMeal.uid = $rootScope.user.uid;
		SchedulingFactory.postNewMeal($scope.newMeal)
		.then((postedMeal) => {
			// add Cook Team here; need the postedMeal id ???
console.log("postedMeal :: ", postedMeal);
console.log("postedMeal.id :: ", postedMeal.id);

console.log("$scope.newMeal.id :: ", $scope.newMeal.id);
			resolve(postedMeal);
console.log("resolved: postedMeal :: ", postedMeal);

			$scope.newMeal = {};
			$location.url("/meals/list");
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

});