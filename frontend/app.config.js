import 'dotenv/config';

export default
  {
    "expo": {
      "name": "kaona",
      "slug": "kaona",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/images/icon.png",
      "scheme": "com.byte.kaona",
      "platforms": [
        "ios",
        "android",
        "web"
      ],
      "userInterfaceStyle": "automatic",
      "newArchEnabled": true,
      "ios": {
        "supportsTablet": true,
        "bundleIdentifier": "com.byte.kaona",
        "googleServicesFile": "./GoogleService-Info.plist"
      },
      "android": {
        "adaptiveIcon": {
          "foregroundImage": "./assets/images/adaptive-icon.png",
          "backgroundColor": "#ffffff"
        },
        "package": "com.uwbyte.kaona",
        "googleServicesFile": "./google-services.json"
      },
      "web": {
        "bundler": "metro",
        "output": "static",
        "favicon": "./assets/images/favicon.png"
      },
      "plugins": [
        "expo-router",
        [
          "expo-build-properties",
          {
            "ios": {
              "useFrameworks": "static"
            }
          }
        ],
        [
          "expo-splash-screen",
          {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 200,
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
          }
        ]
      ],
      "experiments": {
        "typedRoutes": true
      },
      "extra": {
  "router": {
    "origin": false
  },
  "eas": {
    "projectId": "4e48360e-4884-4cba-bce0-3094531bbe6a"
  },

  // Flattened Firebase config for correct runtime loading
  "FIREBASE_API_KEY": process.env.FIREBASE_API_KEY,
  "FIREBASE_AUTH_DOMAIN": process.env.FIREBASE_AUTH_DOMAIN,
  "FIREBASE_PROJECT_ID": process.env.FIREBASE_PROJECT_ID,
  "FIREBASE_STORAGE_BUCKET": process.env.FIREBASE_STORAGE_BUCKET,
  "FIREBASE_MESSAGING_SENDER_ID": process.env.FIREBASE_MESSAGING_SENDER_ID,
  "FIREBASE_APP_ID": process.env.FIREBASE_APP_ID,
  "FIREBASE_MEASUREMENT_ID": process.env.FIREBASE_MEASUREMENT_ID,

  // Optional: keep grouped if you still use these elsewhere
  "firebase": {
    "apiKey": process.env.FIREBASE_API_KEY,
    "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
    "messagingSenderId": process.env.FIREBASE_MESSAGING_SENDER_ID,
    "appId": process.env.FIREBASE_APP_ID,
    "measurementId": process.env.FIREBASE_MEASUREMENT_ID
  },

  "WEB_CLIENT_ID": process.env.WEB_CLIENT_ID,
  "IOS_CLIENT_ID": process.env.IOS_CLIENT_ID,
  "ANDROID_CLIENT_ID": process.env.ANDROID_CLIENT_ID,
  
  "googleClientIds": {
    "web": process.env.WEB_CLIENT_ID,
    "ios": process.env.IOS_CLIENT_ID,
    "android": process.env.ANDROID_CLIENT_ID
  },

  "anotherCredential": {
    "exampleKey": process.env.ANOTHER_CLIENT_ID
  }
  }
}
  }