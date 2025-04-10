# Kaona App Frontend Setup Guide

## ✨ Get Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the App in Development

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

## 📖 Learn More

- [Expo Documentation](https://docs.expo.dev/): Learn fundamentals and advanced concepts
- [Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/): A step-by-step guide to building with Expo
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth): Set up auth providers and persistent sessions
- [Google Cloud Console](https://console.cloud.google.com/apis/credentials): Manage OAuth credentials and redirect URIs

---

