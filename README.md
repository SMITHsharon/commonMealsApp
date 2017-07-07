# Common Meals App

### Project Description // Front-End Capstone

This app is designed for the residents of Germantown Commons to facilitate the scheduling of common meals. 

Users (residents) can schedule a meal, be assigned to a cook team when scheduling a meal, and sign-up to attend a meal. 

#### Common Meals App User Login/Register 
![Common Meals App on Launch](https://raw.githubusercontent.com/SMITHsharon/commonMealsApp/screens/screens/Common%20Meals%20App%20Login%20Register.png)

#### Common Meals App on Launch 
![Common Meals App on Launch](https://raw.githubusercontent.com/SMITHsharon/commonMealsApp/screens/screens/Common%20Meals%20App%20on%20Launch.png)

#### Common Meals App | Add Meal
![AddBook1 App on Click to Add New](https://raw.githubusercontent.com/SMITHsharon/commonMealsApp/screens/screens/Common%20Meals%20App%20Add%20Meal.png)

#### Common Meals App | Sign-Up for Meal
![AddBook1 App After Add](https://raw.githubusercontent.com/SMITHsharon/commonMealsApp/screens/screens/Common%20Meals%20App%20Sign-Up.png)

#### Common Meals App | After Add and Sign-Up
![AddBook1 App After Add](https://raw.githubusercontent.com/SMITHsharon/commonMealsApp/screens/screens/Common%20Meals%20App%20After%20Add%20and%20Sign-Up.png)


### Project Specs
- must use Angular
- must use Bootstrap
- must use Trello
- must have wireframes
- must use Grunt
- must use Firebase, with full CRUD: create, update, delete

#### implemented CRUD ...
- The app `add`s a new user upon Register, and automatically completes log-in. 
- The user can `edit` the email address, user name, and url for a profile image. 
- The user can `add`, `edit` and `delete` Meal records. 
- Upon scheduling a meal, people who are assigned to the Cook Team are automatically "signed-up" for the meal. 
- When a user clicks to `edit` a meal, or `edit` the sign-up record for a meal, the fields populate with previously entered data. 
- When a user clicks to sign-up for a meal, detail information for the meal displays. 
- The Meal information on the Meals List screen lists all upcoming meals, and `filter`s the meals that the current user has signed-up for to the Signed-Up list below. Meals that have already occurred are filtered out and do not appear. 
- If the current date is past a meal's Sign-Up date, there will not be a Sign-Up button for that meal. 
- Clicking on the Date for any meal displays the detail information for that meal, as well as a list of those who have signed-up (Guest List). If the current user has signed-up, that user will have the option to `edit` or `delete` the Meal Sign-Up information for that meal. 
- Meal dates are entered using Angular `datepicker`.



### Technologies Used
- `html`
- `css`; `SASS`
- `JavaScript`
- `ES6`
- `jQuery`
- `Bootstrap`
- `Angular`
- `Grunt`


### How To View The Screen 
```
git clone https://github.com/SMITHsharon/commonMealsApp.git
cd commonMealsApp
cd lib
bower install
npm install
http-server -p 8080
This will show in your browser at: http://localhost:8080
```

### To Run The Deployed App
`https://common-meals-app.firebaseapp.com`


### Contributor
[Sharon Smith](https://github.com/SMITHsharon)
