#!/usr/bin/env bash
mkdir android/app/assets
mkdir android/app/src/main/assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
./gradlew assembleDebug
cd app/build/outputs/apk/debug
adb install app-debug.apk
cd ../../../../../../
