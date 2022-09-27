# React Native WebRTC PeerJS

This is a simple application illustrating video call written in React Native with WebRTC and PeerJS.

## Screenshot

![alt text](https://github.com/tuanpq/static/blob/master/react-native-webrtc-peerjs/images/Screenshot_1.jpeg "Video calling")

## Implementation flow

TODO:

## Setup development environment

https://reactnative.dev/docs/environment-setup

## 3rd Libraries

npm install react-native-webrtc@~1.100.1 \
npm install react-native-peerjs

## iOS

### Run on iOS simulator

1. $npm install
2. $npx pod-install ios
3. $npx react-native start
4. Open a seperate Terminal and run $npx react-native run-ios

### Build debug ipa

1. Open ios/LMS.xcworkspace file by Xcode
2. Configure project's Build settings
3. From Xcode's Product menu, choose Archive

## Android

### Run on Android simulator

1. $npm install
2. $npx react-native start
3. $cd android
4. $./gradlew assembleDebug --warning-mode all
5. Open a seperate Terminal and run $npx react-native run-android

### Build debug apk

1. $mkdir android/app/assets
2. $mkdir android/app/src/main/assets
3. $npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
4. $cd android/
5. $./gradlew assembleDebug
6. $cd app/build/outputs/apk/debug

## Upgrade project

https://reactnative.dev/docs/upgrading

## Troubleshooting

### Build error

rm -rf node_modules \
rm package-lock.json \
rm yarn.lock \
rm -rf ios/Pods \
rm ios/Podfile.lock \
npm install \
npx pod-install ios \
npx react-native start --reset-cache

### 3rd libraries

Here are some reference links to 3rd libraries.
- [react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc)
- [react-native-peerjs](https://github.com/Zemke/react-native-peerjs)
