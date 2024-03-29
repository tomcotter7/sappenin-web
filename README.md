# Sappenin' Web

This a a react project to build out the sappenin.uk website. It is currently in development.

To install, git clone this repo, then run `npm install` to install the required dependencies.

The project documentation can be found by opening docs/index.html in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run docs`

Builds the documentation for the application using jsdocs + better-docs

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deploying

This project is currently using firbase hosting. To deploy to production, first build the project:

`npm run build`

Then to deploy, use:

`firebase deploy --only hosting`

If you encounter any auth errors - chuck me an email - thomascotter00@gmail.com

## PRs

If you want to contribute to this project, please feel free to do so. I will review all PRs and merge them in if they are suitable.

Please run 'npm run docs' and 'npm run build' before submitting a PR to ensure the documentation is up to date and the build is successful.



## TODO

This section details all of the next tasks that need to be accomplished:

- Bug fixes  
- More aesthetic splash screen
- Client page
- Tests

Long-Term:
  - Map + Calendar Section.
  - Aesthetic Improvments.
  - Make deal pages more exciting.
