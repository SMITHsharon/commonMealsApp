app.controller("MealListCtrl", function($rootScope, $scope, SchedulingFactory, CookTeamFactory, SignUpFactory, UserFactory) {


	$scope.meals = [];
	$scope.cooks = [];
	$scope.signUps = [];
	// $scope.keys = [];
	$scope.thisUser = {};
	$scope.CurrentDate = {};


	let getUserInfo = () => {

	   	UserFactory.getUser($rootScope.user.uid).then((user) => {
// console.log("user :: ", user);
// console.log("user.username :: ", user.username);
// console.log("user.id :: ", user.id);
	    	$scope.thisUser.username = user.username;

	    }).catch();
	};
    // getUserInfo();


    let getMeals = () => {
    	getUserInfo();
 		// calling getUser to get the userId is technically better then using $rootScope
		SchedulingFactory.getMealList().then((mealz) => {
			$scope.meals=mealz;
// console.log("$scope.meals :: ", $scope.meals);
			// get cook team for each meal
			for (let i=0; i<$scope.meals.length; i++) {
				// getCooks($scope.meals[i].id);
				CookTeamFactory.getCookTeam($scope.meals[i].id)
				.then((cookNamez) => {
					$scope.meals[i].cookNames = cookNamez;
				})
				.catch((error) => {
					console.log("error on getCookTeam", error);
				});
				SignUpFactory.isUserSignedUp($rootScope.user.uid, $scope.meals[i].id)
				.then((uzerSignedUp) => {
					$scope.meals[i].userSignedUp = uzerSignedUp;
				})
				.catch((error) => {
					console.log("error on isUserSignedUp", error);
				});
			}
console.log("$scope.meals :: ", $scope.meals);
			// get meals current user has signed-up for 
			getUserSignUps($rootScope.user.uid);
			
// console.log("$scope.meals :: ", $scope.meals);

		}).catch((error) => {
		  console.log("error on getMeals", error);
		});
	};
	getMeals();


	let getUserSignUps = (userId) => {
		SignUpFactory.getUserSignUpz(userId)
		.then((signUpz) => {
			signUpz.forEach((signUp) => {
				$scope.signUps.push(signUp);
			});		
// console.log("$scope.signUps :: ", $scope.signUps);
		})
		.catch((error) => {
			console.log("error on getUserSignUps", error);
		});
	};


	// function provides the conditional based on deadline, 
	// whether to show the <Sign Up> button
	$scope.isAfterDeadline = (meal) => {
		let currentDate = new Date();
		return moment(meal.deadline).isAfter(moment(currentDate));
	};

});
