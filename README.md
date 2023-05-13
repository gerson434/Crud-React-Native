Project Title: React Native CRUD Project with Expo
==================================================

Introduction:
-------------

This is a sample React Native project built with Expo that demonstrates how to implement basic CRUD (Create, Read, Update, Delete) functionality using React Native components and Firebase Realtime Database.

Installation Steps:
-------------------

1.  Install Node.js and npm on your machine. You can download and install them from the official website: <https://nodejs.org/en/download/>

2.  Install Expo CLI by running the following command in your terminal:

``
    `npm install -g expo-cli`
``

3.  Create a new React Native project with Expo by running the following command in your terminal:

   ``
    `expo init my-project`
``

4.  Select the "blank" template when prompted to choose a template.

5.  Change into the project directory:

```
    `cd my-project` 
```

6.  Install the required dependencies:

    ```
     npm install firebase react-native-elements react-native-vector-icons react-navigation react-navigation-stack 
    ```


7.  Create a new Firebase project and configure it for your React Native app. You can follow the instructions provided in the Firebase documentation: <https://firebase.google.com/docs/web/setup>

8.  Add the Firebase configuration to your React Native app by creating a new file named `firebase.js` in the `src` directory with the following code:

```javascript

    `import firebase from 'firebase/app';
    import 'firebase/database';

    const firebaseConfig = {
        // your Firebase configuration here
    };

    firebase.initializeApp(firebaseConfig);

    export default firebase;
```


Add User Screen
============================

This code is a React Native screen component that allows users to input user details and save them to a Firebase database. It includes input fields for name, email, and phone number.

Dependencies
------------

The component imports the following dependencies from the React Native and Firebase libraries:

-   `React` and `useState` from "react"
-   `Button`, `View`, `StyleSheet`, `TextInput`, and `ScrollView` from "react-native"
-   `firebase` from "../database/firebase"

Functional Components
---------------------

The `AddUserScreen` functional component accepts a `props` parameter and returns a `ScrollView` that contains the user input fields and a "Save User" button.

### State

The `useState` hook is used to manage the component's state, which is initialized with an `initialState` object that contains empty strings for `name`, `email`, and `phone`.

```javascript

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const [state, setState] = useState(initialState);
```

### Event Handlers

The `handleChangeText` function is used as an event handler to update the `state` object whenever the user inputs text into an input field. It takes two arguments: `value` (the new input value) and `name` (the name of the input field).

```javascript

    const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
    };
```

The `saveNewUser` function is used as an event handler for the "Save User" button. It first checks that the `name` input field is not empty. If it is empty, it displays an alert to the user. If it is not empty, it saves the user details to the Firebase database using the `firebase.db.collection().add()` method and navigates the user to the "UsersList" screen. If there is an error during the save process, it logs the error to the console.


```javascript
    const saveNewUser = async () => {
     if (state.name === "") {
    alert("please provide a name");
         } else {
     try {
      await firebase.db.collection("users").add({
        name: state.name,
        email: state.email,
        phone: state.phone,
      });
      props.navigation.navigate("UsersList");
    } catch (error) {
      console.log(error);
    }
         }
    };
```

### Rendered Components

The component renders three `TextInput` components for the `name`, `email`, and `phone` input fields. Each input field is wrapped in a `View` with a bottom border and a margin at the bottom.



```javascript
<View style={styles.inputGroup}>
  <TextInput
    placeholder="Name"
    onChangeText={(value) => handleChangeText(value, "name")}
    value={state.name}
  />
</View>

<View style={styles.inputGroup}>
  <TextInput
    placeholder="Email"
    multiline={true}
    numberOfLines={4}
    onChangeText={(value) => handleChangeText(value, "email")}
    value={state.email}
  />
</View>

<View style={styles.inputGroup}>
  <TextInput
    placeholder="phone"
    onChangeText={(value) => handleChangeText(value, "phone")}
    value={state.phone}
  />
</View>
```

The "Save User" button is rendered within a `View` with a margin at the top.

```javascript
<View style={styles.button}>
  <Button title="Save User" onPress={() => saveNewUser()} />
</View>
```

### Styles

The component defines the following styles using the `StyleSheet.create()` method:

-   `container`: sets the `flex` and `padding` properties 

User Detail Screen Component
============================

This is a React Native component that displays the details of a user and allows for editing and deletion of the user. The component is responsible for fetching the user data from Firebase, displaying the data in input fields, and updating the user data when the "Update" button is pressed. It also displays a confirmation alert before deleting the user.

Libraries Used
--------------

-   React
-   React Native
-   React Native Gesture Handler
-   Firebase

Installation
------------

To use this component in your React Native project, you must first install the necessary libraries:

1.  Install React and React Native:

```
  npm install react react-native
``` 
2.  Install React Native Gesture Handler:
```
  npm install react-native-gesture-handler
```
3.  Install Firebase:
```
  npm install firebase
```
Usage
-----

Once the libraries are installed, you can import the `UserDetailScreen` component into your project and use it as follows:
```javascript
  import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import UserDetailScreen from "./UserDetailScreen";

const Stack = createStackNavigator();

const App = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen name="UserDetail" component={UserDetailScreen} />

    </Stack.Navigator>

  );

};

export default App;

``` 
Note that this example uses the `createStackNavigator` function from the `@react-navigation/stack` library to create a navigation stack with the `UserDetailScreen` component as a screen.

Props
-----

The `UserDetailScreen` component expects a single prop:

-   `userId` (required): The ID of the user to display. This prop is passed as a parameter in the route object when navigating to the `UserDetailScreen` component.

Functionality
-------------

When the component mounts, it fetches the user data from Firebase using the `getUserById` function. The user data is stored in the component state using the `useState` hook. The `handleTextChange` function is used to update the state when the user enters data into the input fields.

When the "Update" button is pressed, the `updateUser` function updates the user data in Firebase and navigates back to the user list. When the "Delete" button is pressed, the `openConfirmationAlert` function displays a confirmation alert before calling the `deleteUser` function, which deletes the user from Firebase and navigates back to the user list.

While the component is fetching the user data or deleting/updating the user, it displays a loading indicator using the `ActivityIndicator` component. The component also uses the `StyleSheet` API to define some custom styles for the input fields and buttons.

# Code Documentation: UserScreen Component

## Description:

This is a React Native functional component that displays a list of users fetched from a Firebase Firestore database. It also provides a button to navigate to a screen for creating a new user and allows users to navigate to a screen for viewing detailed information about a particular user.

## Dependencies:

- React

- React Native

- React Native Elements

- React Native Gesture Handler

- Firebase Firestore

## Props:

This component does not receive any props.

## State:

- `users`: An array of user objects containing the `id`, `name`, `email`, and `phone` of each user.

## Methods:

- `useEffect`: This React Hook is used to fetch the list of users from the Firebase Firestore database and update the `users` state whenever the component mounts or updates.

- `render`: This method renders a ScrollView containing a Button for creating a new user and a list of ListItem components, each representing a user fetched from the Firebase Firestore database.

## Code:

- `import React, { useState, useEffect } from "react";`: Import statements for the necessary React and React Native modules.

- `import { Button, StyleSheet } from "react-native";`: Import statement for the necessary React Native modules.

- `import { ListItem, Avatar } from "react-native-elements";`: Import statement for the necessary React Native Elements modules.

- `import { ScrollView } from "react-native-gesture-handler";`: Import statement for the necessary React Native Gesture Handler module.

- `import firebase from "../database/firebase";`: Import statement for the Firebase configuration module.

- `const UserScreen = (props) => {...};`: The functional component definition.

- `const [users, setUsers] = useState([]);`: The `users` state definition and initialization as an empty array.

- `useEffect(() => {...}, []);`: The useEffect Hook that fetches the list of users from the Firebase Firestore database and updates the `users` state.

- `return (...);`: The return statement that renders a ScrollView containing a Button for creating a new user and a list of ListItem components representing each user fetched from the Firebase Firestore database.

## Example Usage:

```javascript

import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import UserScreen from "./screens/UserScreen";

import CreateUserScreen from "./screens/CreateUserScreen";

import UserDetailScreen from "./screens/UserDetailScreen";

const Stack = createStackNavigator();

const App = () => {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="UserScreen">

        <Stack.Screen name="UserScreen" component={UserScreen} />

        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />

        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />

      </Stack.Navigator>

    </NavigationContainer>

  );

};

export default App;

```

# User List

Below is the Markdown format documentation for the `UserScreen.js` file.

## Description

The `UserScreen.js` file contains the code for the user screen in the mobile application. This screen displays a list of users obtained from a Firebase database and allows for creating new users.

## Functionality

The `UserScreen` component is exported by default and is used in the main application file (`App.js`).

When the component mounts, the `useEffect` hook is used to fetch a snapshot of the "users" collection from the Firebase database. The result is stored in the `users` state using the `useState` hook.

The `onSnapshot` function is used to listen for changes in the collection of users and update the list of users in real-time. The data from each document in the collection is obtained and stored in a `user` object, which is added to the `users` array.

The `ScrollView` component allows for scrolling the list of users up or down.

The `map` function is used to iterate over the `users` array and render a `ListItem` component for each user. The data for each user is displayed in the `ListItem.Title` and `ListItem.Subtitle` components.

When a `ListItem` is clicked, the `UserDetailScreen` is navigated to, and the `id` of the user is passed as a parameter using `props.navigation.navigate`.

## Dependencies

The `UserScreen.js` file uses the following dependencies:

- `react`

- `react-native`

- `react-native-elements`

- `react-native-gesture-handler`

- `firebase`

## Code

```jsx

import React, { useState, useEffect } from "react";

import { Button, StyleSheet } from "react-native";

import { ListItem, Avatar } from "react-native-elements";

import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserScreen = (props) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    firebase.db.collection("users").onSnapshot((querySnapshot) => {

      const users = [];

      querySnapshot.docs.forEach((doc) => {

        const { name, email, phone } = doc.data();

        users.push({

          id: doc.id,

          name,

          email,

          phone,

        });

      });

      setUsers(users);

    });

  }, []);

  return (

    <ScrollView>

      <Button

        onPress={() => props.navigation.navigate("CreateUserScreen")}

        title="Create User"

      />

      {users.map((user) => {

        return (

          <ListItem

            key={user.id}

            bottomDivider

            onPress={() => {

              props.navigation.navigate("UserDetailScreen", {

                userId: user.id,

              });

            }}

          >

            <ListItem.Chevron />

            <Avatar

              source={{

                uri:

                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",

              }}

              rounded

            />

            <ListItem.Content>

              <ListItem.Title>{user.name}</ListItem.Title>

              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>

            </ListItem.Content>

          </ListItem>

        );

      })}

    </ScrollView>

  );

};

export default UserScreen;

```
The code you provided is a Python program that calculates the average of a list of numbers. It does this by first initializing a variable "total" to 0, and then looping through each number in the list, adding it to the total variable. After the loop finishes, it calculates the average by dividing the total by the length of the list.

Overall, this code is a simple and straightforward implementation of an average calculation. However, it could be improved by adding some error handling to ensure that the list is not empty and that all the elements are numeric. Additionally, the program could be made more versatile by allowing the user to input their own list of numbers rather than hardcoding it in the program.