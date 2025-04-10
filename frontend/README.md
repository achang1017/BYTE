# Kaona App Frontend Setup Guide

## ✨ Get Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Update .env file

With the credential shared within the team, update the .env file. at the root 

### 3. Start the App in Development

```bash
npx expo start
```

This will give you options to open the app in:

- Web
- Android Emulator – [Setup Guide](https://docs.expo.dev/workflow/android-studio-emulator/)
- iOS Simulator – [Setup Guide](https://docs.expo.dev/workflow/ios-simulator/)

> The app will run inside the **Expo Go** client, which does not support custom native modules like Google Auth.

---

## ⚠️ Google Auth Limitation with Expo Go

Due to technical limitations, **Google login does not work inside the Expo Go app**. Only **email/password login** is supported in that environment.

To use Google Sign-In, you must run the app via a custom development build or install it in a local emulator.

---

## ✅ Running the App with Google Login Support

### Option 1: Local Development Build in a Simulator/Emulator (Recommended)

This method builds and installs a dedicated development build of the app on your local machine.

#### iOS
- Requires Xcode and CocoaPods
- To launch in the iOS simulator:

```bash
npx expo run:ios
```

#### Android
- Requires Android Studio and Android SDK
- To launch in the Android emulator:

```bash
npx expo run:android
```

> This process builds a standalone version of the Kaona app in your emulator.

---

### Option 2: Build with EAS (Expo Application Services)

Use EAS to generate a downloadable `.apk` (Android) or `.app` (iOS) file, then install it manually in your emulator.

```bash
npx eas build --profile development-simulator --platform android
npx eas build --profile development-simulator --platform ios
```

After the build completes, download the file from:

👉 [Expo Build Page](https://expo.dev/accounts/uwbyte/projects/kaona/builds)

Then simply **drag the file into your emulator** to install.

> 🔁 For Google Sign-In to work, make sure the correct `redirectUri` is configured and whitelisted in your Google Cloud Console.

---

## 🔐 Configuring SHA Key for Firebase (Required for Android Google Login)

If Google Sign-In fails on Android with an SHA key error:

### 1. Retrieve Your SHA-1 Key

```bash
eas credentials -p android
```

Copy the value under **SHA1 Fingerprint**.

### 2. Add the SHA-1 Key to Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Navigate to:  
  `Project Settings > General > Your App (com.uwbyte.kaona)`
- Under **SHA certificate fingerprints**, click **Add fingerprint**
- Paste the SHA-1 key and click **Save**

> 🔀 You can register multiple SHA-1 keys to support different developers or environments.

---

## 🚀 Building for Production

You can build production versions of the app using EAS:

### Android Production Build
```bash
npx eas build --platform android --profile production
```

### iOS Production Build
> ⚠️ iOS production builds require an active Apple Developer membership, which involves additional cost. This step is currently not supported.

---

## 🔧 Managing Environment Variables

If you need to add API keys or other sensitive configuration, follow these steps to securely manage your environment variables using a `.env` file and Expo’s `extra` config.

---

### 1️⃣ Update `.env` File

At the root of your project, create or update a `.env` file and define your variables:

```env
KEY=your_value
```

> ✅ After updating `.env`, always restart your development server:
>
> ```bash
> npx expo start --clear
> ```

---

### 2️⃣ Inject Variables via `app.config.js`

Ensure you have an `app.config.js` (rename from `app.json` if needed), and import the variables using `dotenv`:

```js
import 'dotenv/config';

export default {
  expo: {
    name: 'kaona',
    slug: 'kaona',
    version: '1.0.0',
    // other config...
    extra: {
      anotherCredential: {
        exampleKey: process.env.ANOTHER_CLIENT_ID,
      },
    },
  },
};
```

---

### 3️⃣ Access Variables in Your App (with `expo-constants`)

To use your custom environment variables within your application code:

```ts
import Constants from 'expo-constants';

const clientId = Constants.expoConfig?.extra?.anotherCredential?.exampleKey;
```

> You can now safely use environment variables for Firebase setup, Google Auth, and other API integrations.

---

### 4️⃣ Add Environment Variables to EAS Dashboard

You also need to add the same variables in the [Expo Dashboard](https://expo.dev) under:

**Project → Builds → Environment Variables**

For each variable in your `.env`, create a key–value pair. For example:

| Key                | Value                                           |
| ------------------ | ----------------------------------------------- |
| `FIREBASE_API_KEY` | `AIza...`                                       |
| `WEB_CLIENT_ID`    | `your-web-client-id.apps.googleusercontent.com` |

This ensures your builds work correctly in both development and production environments.

---


## 📖 Learn More

- [Expo Documentation](https://docs.expo.dev/): Learn fundamentals and advanced concepts
- [Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/): A step-by-step guide to building with Expo
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth): Set up auth providers and persistent sessions
- [Google Cloud Console](https://console.cloud.google.com/apis/credentials): Manage OAuth credentials and redirect URIs

---

