#!/bin/bash
cd "$(dirname "$0")"

export ANDROID_HOME=$HOME/android-sdk
export JAVA_HOME=/data/data/com.termux/files/usr/lib/jvm/java-21-openjdk

gradle assembleDebug --no-daemon
