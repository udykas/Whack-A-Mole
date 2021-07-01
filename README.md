<img src="./src/banner.png" alt="Whack-A-Mole">

This is a Super Mario themed Whack-A-Mole game written in Vanilla Javascript, HTML and CSS. The ES6 JS is compiled using Babel, so it's compatible with IE11, Chrome and Firefox.

## Running the Game

To run the game on your computer first git clone this repo:

`git clone https://github.com/udykas/Whack-A-Mole.git`

Once the repo is finished cloning, open the repo in a code editor and locate `index.html` in the `src` folder. Right click the file and copy the path.

Next, paste the path to `index.html` in your broswer of choice and the game should run.

If the game isn't working, or if you make any changes to `index.js` inside of `src`, do the following:

Run `npm install` to get the Babel node modules.

After the node modules are installed, run the following command in your terminal to compile `src/index.js`:

`./node_modules/.bin/babel src --out-dir lib`

This will compile the code inside `src/index.js` and output it to `lib/index.js` which is the JS file imported into `index.html`.

## Gameplay

Click the "Start" button to start the game. Moles will begin appearing randomly in the 9 holes on the screen for random intervals of time. Click on the moles before they disappear to earn 10 points for each successful "Whack." The game will end after 15 seconds. You can also stop or reset the game by clicking on the respective button at the top of the screen.
