# RV Context Menu Commands

This extension will let us run commonly used terminal commands from the explorer context menu.

## Features

- Removes the need to type: gulp watch --preamp --asset='{filepath}' to watch directories.
- Deploy to staging and production from context menu.
- Start development or production node server from context menu.

## Requirements

You need to be using correct version of node supported by the project. For now, if you need to set a default node version for a specific project, you can run this command:

`> nvm alias default {node version}`

Node version handling will be added later.

And for now... be on the right team at RV :)

## How to Use

Right click on a folder in the vscode explorer and you will get a list of allowed actions at the bottom of your context menu.

### Available Actions

#### 1. Gulp Watch This

##### Prerequisites

Currently this option is available on all folders. Will run a check to make sure you are in a **"preamp"** parent directory.

##### Action

Runs the gulp watch terminal command on the selected folder path.

`> gulp watch --preamp --asset='{relative path of folder}'`

#### 2. Deploy to Staging

##### Prerequisites

Available on the **"control"**, **"test"**, **"test2"** experience folders nested under v2 -> siteConfig -> frontier -> experience.

##### Action

Runs the npm script in the terminal to deploy cart to staging.

`> npm deploy:staging:{selected experience folder}`

#### 3. Deploy to Production

##### Prerequisites

Available on the **"control"**, **"test"**, **"test2"** experience folders nested under v2 -> siteConfig -> frontier -> experience.

##### Action

Runs the npm script in the terminal to deploy cart to staging.

`> npm deploy:prod:{selected experience folder}`

#### 4. Run Node: Development

##### Prerequisites

Add **"checkout.node"** to your workspace with cart! Available on the **checkout.node** folder.

##### Action

Runs the npm script in the terminal to start the node development server.

`> npm run dev`

#### 5. Run Node: Production

##### Prerequisites

Add **checkout.node** to your workspace with cart! Available on the **checkout.node** folder.

##### Action

Runs the npm script in the terminal to start the node production server.

`> npm run prod`

## Known Issues

- No node version checking before running commands related to npm.
- Gulp watch context menu item is available on all folders. Compatiblity check doesn't run until after running gulp watch command.
- Deploy to staging or production command only checks for folder name. Need to implement deeper checks.
- No checks to see if duplicate scripts are currently active. Will implement check and handlers to handle those situations.

## Future Plans

- `contributes.configuration` will be supported in future releases. This will give us the ability to add custom commands, command groups and logic checking.
- Spin up cart from context menu.

## Release Notes

### 1.1.2

#### Changed

- Fix incorrect terminal directory for run node server and deploy commands.

### 1.1.1

#### Added

- Add documentation to functions.

#### Changed

- Updated readmes and changelogs.

### 1.1.0

#### Added

- Run development or production server commands added.

### 1.0.2

#### Changes

- Updating changelog and readme.

### 1.0.0

Initial release!
