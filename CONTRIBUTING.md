# Contributing

There are a number of ways to help and contribute to the project:

- Submit a `New Issue` to report a bug or request a new feature
- The game changes rapidly, so if talents are out of date on the website, submit a `New Issue`
- Spread the word! Share your talent builds on social media (e.g. Reddit, Discord) and direct people to the site
- If you're a developer and familiar with Javascript/React, pull requests are always welcome :pray: See below for development details

## Development

### Overview

Versioned releases are kept on `master` branch. The `develop` branch is the staging area for future releases. Make your pull requests to `develop`.

Continuous integration tests are run automatically on pull requests to `develop`.

Once a commit is made to `master`, a GitHub action will trigger to deploy the site and purge the Cloudflare cache. Once a commit is tagged on `master`, a GitHub release will be created automatically.

### Environment setup

 1. Install [node.js](https://nodejs.org/)
 2. Clone this repo
    - `git clone https://github.com/sho-87/rok-talents`

### Develop, test, PR

 1. (Important) Checkout `develop` branch
    - `git checkout develop`
 2. Install app dependencies
    - `npm install`
 3. Run local dev server
    - `npm start`
 4. Create a feature branch off of `develop`
 5. Bump version in `package.json`
 6. Make your code changes
    - Preferred code formatter: `prettier`
 7. Write tests
 8. Run tests
    - `npm test`
 9. Merge your feature branch into local `develop`
 10. Make a pull request to upstream `develop` branch
 11. Fast forward `master` to `develop` (this will release the site; more info below)

### Adding commanders

The process for adding a new commander is straightforward:

 1. Add their info to `data/commanders.json`
    - The `id` key must be unique and incremented by 1 for each new commander
    - The `shortName` key is optional, and is used when a shorter name is preferred for the dropdown list
 2. Add commander image to `public/images/commanders`
    - Images can be created using the Photoshop template found in `templates`
    - The image filename *must* match the full name used in `commanders.json`
    - Commander images should have dimensions of 120x133px and transparent background

The changes above should be picked up automatically and the commander will appear in the list with the correct talent trees/info.

## Additional Notes

### Tests

Tests are stored in `__tests__`. Tests use [React Testing Library](https://github.com/testing-library/react-testing-library) and are run using [Jest](https://jestjs.io/)

Each component should have a separate test file with the filename convention `<component>.test.js`

### Data

Commander information is stored in `data/commanders.json`. It includes information like commander name, ID, and the names of their talent trees. This file should be edited when adding a new commander.

In-game talent data often changes (e.g. talent text, values) and this app tries to support builds that were created using older game data. Talent data is found in `data/v*`. If major talent changes are introduced to the game, a new version directory should be created containing data for all talent trees (changed or not). The game `dataVersion` also needs to be bumped in `package.json`.

`data/AllTrees.js` handles the loading of the correct game data version. When loading an old build, the data version will be extracted from the query parameter stored in the URL. Otherwise, the latest data version will be loaded (i.e. the data version in `package.json`)

### Talent build URL

The encoding and decoding of a talent build is done using functions found in `utils.js`. Their implementation should almost *never* be changed, or at least changed very very very carefully. Breaking this has severe implications for the ability to share old talent builds. For example, if the encode/decode method is changed, any existing talent builds will basically be unusable as the URL will be different.

The number-to-letter mapping can be found in `values.js`.

### Announcements

Announcements are found in the `announcements` directory and loaded into a modal. On the website, they can be accessed manually from the Info menu under Releases.

The latest website version that the user has seen is stored in their browsers Local Storage. This is done in `App.js` when the main app component mounts. When a new major or minor website version is released (by incrementing the version in `package.json`), it is compared to the users stored version. If a new version is found, then the latest announcement is shown automatically when the user visits the site.

### Website Settings

User settings changes are persistent across sessions, and the values are stored in the browsers Local Storage. All of this is done in `App.js`.

### Site Deployment

#### GitHub Pages

The entire site is served from GitHub Pages in the `gh-pages` branch of the main repo. This is tied to a custom domain, as can be seen in `Settings -> Pages`.

Talent builds are linkable and shareable with other users (www.roktalents.com/xxx). As a result, changing the domain will break existing talent build links, and a non-trivial amount of work is required to ensure that both old and new links work if changing the domain. This is because a lot of information (e.g. embed state, point distribution etc.) is pulled directly from the URL to help populate the contents of the page when viewing existing builds. You can see this in `index.js` and `App.js`.

Cloudflare is placed infront of GitHub pages to cache the site and limit the amount of traffic going to GitHub directly.

#### GitHub Actions

A number of GitHub actions are set up to automate deployment. You can see these in `.github/workflows`.

As soon as commits are merged into the `master` branch, the CD action will be called which will:

1. Run tests and build the app
2. Deploy the `master` branch as a site to GitHub Pages. The changes are now live!
3. Purge the Cloudflare cache so end users see the updated site

**Important:** the changes go *live* as soon as anything is pushed to the `master` branch and the GitHub action succeeds! As a result, make sure you test locally and first push to the `develop` branch for testing. Make sure the site works before anything touches `master`.

I strongly recommend:

1. Work in the `develop` branch
2. When ready, *fast forward* `master` to `develop` (no merge commits)
3. Then, push both branches to GitHub for deployment

A second GitHub action exists for automatic release tagging. Whenever a commit is tagged with `vx.x.x` (e.g. `v1.9.0`), an action will trigger that creates an automatic release on GitHub.
