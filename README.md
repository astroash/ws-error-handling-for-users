# Error Handling for Users

Error handling is great as it allows us to stop errors from crashing our server. When we start out it's useful to console log these errors to see what happened, but this isn't very useful for the users of our site. In this workshop we are going to learn how to avoid errors with validation, handle the remaining errors and then safely deliver them to the front end so users can see what happened. 

## Prerequisits 🙇🏽‍
Knowledge of:
- vanilla js dom manipulation
- sql databases
- express node server
- promises

## Get Up and running

1. Clone or fork the repo:

```
$ https://github.com/astroash/ws-error-handling-for-users.git
```

2. Install all the dependencies by cd-ing into the folder and running:

```
$ npm i
```

3. Start the server:

```
$ npm run dev
```

4. Navigate to to http://localhost:3000/ to view the page. 

## Where do our errors go?
It's easy to think of error handling on the server in isolation to the rest of our site, after all we're often forced to do it because of the error first callback nature of Node. However, the way we decide to handle errors is an architectural decision which impacts how we write code on the front and back end of our apps.

Let's break down why this is important:

> why do catch errors on our server? 

To stop our server from crashing 🙌🏽

> why don't we want our server to crash?
 
because our website will stop responding 🙌🏽

> why is this bad?
 
because our users won't be able to use our site 🙌🏽

> what happens if the only way we handle our error is to console log, will our users know what went wrong?
 
Ummmmmmm.... 🤔

The answer is _nope_, if we don't send relevant responses to our client AND handle these appropriately, then our site can appear to hang/break/not respond as a user would expect.

We build web apps for users, so in this workshop we're going to take a user centered approach to error handling.

To model this approach we are going to edit a simple site with a form that allows users to sign up by entering their details. We are going to break our user centered error handling into 3 parts:
- informing our users of errors
- validating data to avoid errors
- handling errors on our server _to inform our users_

## Displaying error messages 🚨
Displaying errors on your website allows users to know what went wrong. This might be because:
- their input is invalid
- the action they have attempted did not work

If you go to `public/home.html` you can see the form that has been created for users to input information. Each input is followed by an error icon that is `hidden` by default. There is also an error `<p>` tag at the bottom of the form that is currently empty.

In `main.js` an event listener has been added to the "Full Name" input box. Front end validation is being used to check if this contains no numbers and special characters on `blur`.

_NB: did you know on `blur` is an event type for when elements go out of focus. You can find out more about [different event types in MDNs docs](https://developer.mozilla.org/en-US/docs/Web/Events)_

Go to http://localhost:3000/ and test the "Full Name" input box to see how this works
### 🌟 Challenge One 🌟
Using the starting code as an example, create error messages for the other 3 input boxes.

## Front End Validation 💻
Validation is useful as it allows us to check that the correct types of data are being submitted to our server. So far we are displaying errors to tell users if any information that have entered in invalid, however they are still able to submit the form.

### 🌟 Challenge Two 🌟
Overwrite the submit button on the form so that you can handle when the data is submitted. Only allow users to submit the information if it passes your validation checks. You may want to refactor some of your checks into functions so that they can be used in both the on `blur` event listers and the form submission.

If you are comfortable with promises, you can you `fetch` to make a call to your server.

[Check out MDNs docs on making a POST request with fetch here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

You will need to grab the data inputted in your form and create a stringified JSON object to send as the body.

## Back End Validation 🗄
Now that we have written validation for the front end, we can implement this on the server too. This is important as users can still bypass our front end validation to submit the form by either disabling the javascript file, or using a tool like postman.


### 🌟 Challenge Three 🌟
**Step 1.**
In the form handler grab the form data from the request and use the same validation checks you used in the front end.

**Step 2.**
If any data does not pass validation checks send an error response to the front end. It is useful if you send your data in an object such as:
```
{
  error: true,
  message: [a description of the error]
}
```

Remember to also [set your status code](https://expressjs.com/en/api.html#res.status) to one that describes the response.

[A list of status codes can be found here](https://httpstatuses.com/).  
[Or if you prefer a more visual explanation, here's status codes as cats](https://http.cat/).

Now, on the front end you can check your response object and set the error `<p>` tag correctly.

## Back End Error Handling 🚫
Now we can check if the user already exists in our database.

Set up your database:
___
 In terminal type psql, or pgcli if installed. Within psql/pcli enter the
following commands each followed by a return. Things in square brackets are for
your desired values. Note that password is a string inside '' (NOT double quotes
-> ""):

```
CREATE DATABASE [db_name];
CREATE USER [user_name] WITH SUPERUSER PASSWORD ['password'];
ALTER DATABASE [db_name] OWNER TO [user_name];
```

Create a `.env` file in your root directory and add your database url:
```
DATABASE_URL=postgres://[user_name]:[password]@localhost:5432/[db_name]
```

Next open psql/pgcli in terminal and connect to your test database: `\c [test_database_name]`

Then build your database `\i [full_path_to_db_build.sql]` 
(To easily copy a file's full path right click on it in your editor and click on "Copy Full Path")
___

### 🌟 Challenge Four 🌟
Now that we have a database of users, we can check if our user exists in our form handler.

**Step 1.**
Use your validated username and pass it to the `checkUser` database query. You can see how the query is written in `/database/queries/check_user`. "astroash" has been entered in the database for you to test with.
If the user exists `rows` will be:
```
[ { exists: true } ]
```
If the user doesn't exist `rows` will be:
```
[ { exists: false } ]
```
Write an if/else statement to take `rows.exists` as a condition. If the user already exists return an appropriate [status code](https://http.cat/) and error message to the frontend. We can use the same format as before:
```
{
  error: true,
  message: [a description of the error]
}
```
You will need to write logic in the return to your `fetch` to display the error message if the user already exists. 

If the user doesn't exists we want to return a success response object to tell the front end everything went well such as:
```
{
  success: true,
  message: [a description of the success]
}
```

 Then in the fetch `.then` we can match on our `success` to redirect to `/success`. We can do this using the window object:
```
window.location = '/success';
```
More details on [`window.location` can be found in MDN's docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/location).

**Step 2.**
Now we need to handle our error if there is a problem with the database. In `routes/form.js` add a `.catch` to our database query.

In here we want to send another error object to the front end with an appropriate [status code](https://http.cat/).

Now we can display the correct error message on the front end!

## Nice WORK 🎉

Congratulations, ✨ YOU DID IT ✨ You've safely avoided errors with validation, and handles the ones that slipped through by sending clear error messages for your users to see.
# 🙌🏽 