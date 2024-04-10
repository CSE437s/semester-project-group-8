# Structure of Ionic App:

This file will talk about the structure of Ionic App in genera, and where we will implement functionalities.

There are few main folders in this Ionic App, and all of them are located in the `\src` folder:

- `\pages`
- `\components`
- `\hooks`
- `\theme`

Each folder corresponds to a specific development role:

## \pages:

This directory holds components that represent entire screen or views of our app; it is essentially UI. For instance, our login page, signup page, user profile page, and etc will be placed in this directory. Files in this directory will be connected to the `App.tsx` file, which will be used to render and display our app.

## \components:

This directory holds reusable UI components of our app. For instance, while we have the login page in the `\pages` directory, we don't necessary design all of our login page components there; instead, we write the components and put them in this directory. In the login page case, we would implement the form (for entering username and password) and store it in this directory.

## \hooks:

This directory is used to store function logic. Hooks are a feature of React that allow us to use state and other React features without writing a class. Custom hooks can be imported and used in both page and component files to share logic and keep our components clean. For example, we could implement a hook that manages user authentication for login or signup.

## Workflow:

Our app starts in App.tsx, where routes are defined. The route determines which page component from `/pages` is rendered. Each page component can then compose its UI using multiple components from `/components`. And finally, our code in `\hooks` will determine the logic and states of pages.
