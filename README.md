# ng-chatbot-demo

Angular Chatbot Client

This source code is part of a blogpost about creating an Angular client for a Microsoft Bot.

More info: [Angular 6 Chatbot Client](https://yuriburger.net/)

To setup the demo:

`npm install`

Add the correct secret to your environment.ts:
```javascript
export const environment = {
  production: false,
  API_KEY: ''
};
```

To build and run the chatbot demo: 

`npm run build`

`npm run start`

Please note: Although the Chat client itself is written for RxJS 6, the botframework-directlinejs still requires rxjs-compat to be available.
