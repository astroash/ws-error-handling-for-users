# Error Handling for Users
Handling errors is useful as it allows us to stop errors from crashing our server. When we start out it's useful to console log these errors to see what happened, but this isn't very useful for the users of our site. In this workshop we are going to learn how we can handle our erros safely and hook them up to client side error messages. 

## Get Up and running

1. Clone or fork the repo:

```
$ git clone https://github.com/ameliejyc/phent-boilerplate.git
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
It's easy to think of error handling on the server in isolation to the rest of our app, after all we're often forced to do it because of the error first callback nature of Node. However, the way we decide to handle errors is an architectural decision which impacts how we write code on the front and back end of our apps.

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

To model this approach we are going to edit a simple site that has a form to allows users to sign up by entering their name, and password. We are going to break our user centered error handling into 3 parts:
- informing our users of errors
- validating data on the frontend
- handling errors on our server _to inform our users_

## Displaying error messages
Displaying errors on your website allows users to know what went wrong. This might be because:
- their input is invalid
- the action they have attempted did not work

If you go to `views/index.hbs` you can see the form that has been created for users to input information. Each input is followed by an error icon that is `hidden` by default. There is also an error paragraph at the bottom of the form that is `hidden`.

In `main.js` an event listener has been added to the "First Name" input box. Front end validation is being used to check if this contains no numbers and special characters on `blur`.

_NB: did you know on `blur` is an event type for when elements go out of focus. You can find out more about [different event types in MDNs docs](https://developer.mozilla.org/en-US/docs/Web/Events)_

Go to localhost:3000 and test the "First Name" input box to see how this works
### Challenge One
Using the starting code as an example, create error messages for the other 3 input boxes.

## Front End Validation
Validation is useful as it allows us to check that the correct data types are being submitted to our server. So far we are displaying errors to tell users if any information that have entered in invalid, however they are still able to submit the form.

### Challenge Two
Overwrite the submit button on the form so that you can handle when the data is submitted. Only allow users to submit the information if is passes your validation checks. 
