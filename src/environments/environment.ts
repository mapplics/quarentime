// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'https://quarentime-gateway-3mtz5tknuq-ew.a.run.app/',  
  availableLangs: ['es', 'en', 'mk', 'nl', 'de'],
  // todo change var production
  firebase_apiKey: 'AIzaSyBKS_gk_e4b9Ev1H1Of_-QQZbUfojI0sE0',
  firebase_authDomain: 'quarentime-prod.firebaseapp.com',
  firebase_databaseURL: 'https://quarentime-prod.firebaseio.com',
  firebase_projectId: 'quarentime-prod',
  firebase_storageBucket: 'quarentime-prod.appspot.com',
  firebase_messagingSenderId: '299005490860',
  firebase_appId: '1:299005490860:web:d8bdb27464dc95cabfd109',
  firebase_measurementId: 'G-E5JG6X7VHQ',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
