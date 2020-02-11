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

Once `develop` is merged to `master`, a GitHub action will trigger to deploy the site and purge the Cloudflare cache. Once a commit is tagged on `master`, a GitHub release will be created automatically.

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

## Notes

### Tests

Tests are stored in `__tests__`. Tests use [React Testing Library](https://github.com/testing-library/react-testing-library) and are run using [Jest](https://jestjs.io/)

Each component should have a separate test file with the filename convention `<component>.test.js`

### Data

Commander information is stored in `data/commanders.json`. It includes information like commander name, ID, and the names of their talent trees. This file should be edited when adding a new commander.

In-game talent data often changes (e.g. talent text, values) and this app tries to support builds that were created using older game data. Talent data is found in `data/v*`. If major talent changes are introduced to the game, a new version directory should be created containing data for all talent trees (changed or not). The game `dataVersion` also needs to be bumped in `package.json`.

`data/AllTrees.js` handles the loading of the correct game data version. When loading an old build, the data version will be extracted from the query parameter stored in the URL. Otherwise, the latest data version will be loaded (i.e. the data version in `package.json`)

### Talent build URL

The encoding and decoding of a talent build is done using functions found in `utils.js`. Their implementation should almost *never* be changed, or at least changed very very very carefully. Breaking this has severe implications for the ability to share old talent builds. For example, if the encode/decode method is changed, any existing talent builds will basically be unusable as the URL will be different.
