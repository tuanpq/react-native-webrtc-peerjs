#!/usr/bin/env bash
rm -rf node_modules
rm package-lock.json
rm yarn.lock
rm -rf ios/Pods
rm ios/Podfile.lock
npm install
npx pod-install ios
