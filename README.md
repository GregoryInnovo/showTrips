# Expo Template Realm TypeScript | Show Trips

- CRUD of trips using realm and Expo with EAS

## 🏃 How to build and run locally

- [Download APK build](https://drive.google.com/file/d/1R06NQAEdIwaOrsS1Z0Ra4yh0zjgMd6XZ/view?usp=sharing)

Install dependencies

```
yarn
```

Run on Android 🤖

```
yarn start (and select android with emulator)
```

## Manual

Create new project in expo or with a template like:

```
npx create-expo-app MyAwesomeRealmApp --template @realm/expo-template
```

Create EAS configuration and build

```
eas login // login expo config

eas build:configure // config project file

eas build:list // check the status of the builds

eas build --profile development --platform android // generate the development APK
```

Generate project files
├───. // config files and entry point
├───app
│   ├───components 
│   ├───core
│   │   ├───data
│   │   ├───domain
│   │   └───presentation
│   │       ├───menu
│   │       └───trips
│   ├───styles
│   └───utils
├───assets
└───node_modules

Read and Delete elements

<img src ="https://i.imgur.com/oMMdfQT.jpg" placeholder="Read and delete elements" />

Create element

<img src ="https://i.imgur.com/9lai6NN.jpg" placeholder="Create element" />

Update element

<img src ="https://i.imgur.com/Q2vbgTD.jpg" placeholder="Update element" />