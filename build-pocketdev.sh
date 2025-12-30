#!/bin/bash
set -e

echo "Building PocketDev APK..."

chmod +x ./gradlew || true

./gradlew assembleDebug
