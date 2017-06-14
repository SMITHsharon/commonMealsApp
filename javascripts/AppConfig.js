
let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);

  // Watch method that fires on change of a route.  Three inputs. 
  // Event is a change event
  // currRoute is information about your current route
  // prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthFactory.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 
      //   so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    // if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});


// my filters
app.filter('isAfter', function() {
  return function(meals, dateAfter) {
    // Using ES6 filter method
    return meals.filter(function(meal){
      return moment(meal.mealDate).isAfter(dateAfter);
    });
  };
});

// app.filter('afterDeadline', function() {
//   return function(meals, dateAfter) {
//     // Using ES6 filter method
//     return meals.filter(function(meal){
//       return moment(meal.deadline).isAfter(dateAfter);
//     });
//   };
// });

app.filter('isSignedUp', function() {
  return function(meals, signUps) {
console.log("meal.id // signUp.mealId :: ", meal.id, signUp.Id);
    if (meal.id === signUp.mealId) {
      return true;
    }
  };
});


app.config(function($routeProvider) {
  $routeProvider
    .when('/auth', {
          templateUrl: 'partials/auth.html',
          controller: 'AuthCtrl'
        })
        .when('/member/profile', {
          templateUrl: 'partials/auth.html',
          controller: 'EditUserCtrl', 
          resolve : {isAuth}
        })
        .when('/meals/list', {
          templateUrl: 'partials/meals-list.html',
          controller: 'MealListCtrl', 
          resolve : {isAuth}
        })
        .when('/meal/add', {
          templateUrl: 'partials/meal-add.html',
          controller: 'MealAddCtrl',
          resolve : {isAuth}
        })
        .when('/meal/edit/:id', {
          templateUrl: 'partials/meal-add.html',
          controller: 'MealEditCtrl',
          resolve : {isAuth}
        })
        .when('/meal/view/:id', {
          templateUrl: 'partials/meal-view.html',
          controller: 'MealViewCtrl',
          resolve : {isAuth}
        })
        .when('/meal/signup/:id', {
          templateUrl: 'partials/meal-signup.html',
          controller: 'MealSignUpCtrl',
          resolve : {isAuth}
        })
        .when('/meal/signup/edit/:id', {
          templateUrl: 'partials/meal-signup.html',
          controller: 'MealSignUpEditCtrl',
          resolve : {isAuth}
        })
        .when('/logout', {
          templateUrl: 'partials/auth.html',
          controller: 'AuthCtrl',
          resolve : {isAuth}
        })
        .otherwise('/auth'); // default catch
});


