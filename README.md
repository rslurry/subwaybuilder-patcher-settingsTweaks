## Dependencies
- No additional dependencies beyond the patcher

## Available settings
- Change the game simulation speeds associated with 1, 2, 3, and 4 speed
- Change the minimum allowed turn radius
- Change the maximum allowed slope percentage
- Change the starting money amount and number of train cars
- Change the length of crossovers created via the construction menu's button
- Change bond parameters
- Change construction cost multipliers
- Adjust elevation thresholds

## Installation
First, download and install Kronifer's patcher: https://github.com/Kronifer/subwaybuilder-patcher

Once that is set up, navigate to the `packages` folder.  Assuming that you are currently in the `subwaybuilder-patcher` folder, then do 
```
cd patcher/packages
```

While here in the packages directory, clone this repository into a folder named `settingsTweaks`:
```
git clone https://github.com/rslurry/subwaybuilder-patcher-settingsTweaks ./settingsTweaks
```

You're now ready to set up the `settingsTweaks` configuration file.  See the next section for details, or skip to the Usage section if you plan to use the Patcher's GUI to easily set up the config file and patch the game.

## Config
Like the `subwaybuilder-patcher` and `mapPatcher`, `settingsTweaks` is controlled by a configuration file named `config.js`.  The configuration file will specify which settings you wish to change and what you wish to set them to.  Each setting can be independently controlled - so if you don't want to change the maximum slope percentage, then turn that off by setting it to `false`.  The `config_example.js` file should give you a good idea how to use it, and all changes are disabled by default so you can selectively enable your desired changes.  Here is an example `config.js` that changes all currently implemented settings:
```js
const config = {
    "changeGameSpeeds" : true, // true or false. Determines whether to change the simulation speeds
    "gameSpeeds" : [1, 100, 1000, 4000], // Simulation speed factor for each game speed - game default is [1, 25, 250, 500] - I recommend [1, 100, 1000, 4000]
    
    "changeMinTurnRadius" : true, // true or false. Determines whether to change the minimum allowed turn radius when building tracks
    "minTurnRadius" : 20, // Minimum allowed turn radius in meters - game default is 29
    
    "changeMaxSlope" : true, // true or false. Determines whether to change the maximum allowed slope percentage when building tracks
    "maxSlope" : 8, // Maximum allowed slope percentage - game default is 4
    
    "changeStartingMoney" : true, // true or false. Determines whether to change the starting money for new games
    "startingMoney" : 10, // Starting money in billions - game default is 3 billion
    "startingTrainCars" : 100, // Starting amount of train cars.  Game default is 30
    
    "changeScissorLength" : true, // true or false.  Determines whether to change the length of the crossovers created via the construction menu's button
    "scissorLength" : 80, // Length of the crossover in meters - game default is 40
    
    "changeBonds" : true, // true or false.  Determines whether to change the bond parameters
    "bondParameters" : {
        "SMALL" : { // Parameters for the smallest bond
            "principal" : 1e9,            // Bond amount - game default is 1e8
            "interestRate" : 0.09,        // Interest rate - game default is 0.1
            "requiredDailyRevenue" : 1e6, // Required daily revenue to take the bond - game default is 1e7
        },
        "MEDIUM" : { // Parameters for the medium-sized bond
            "principal" : 5e9,            // Game default is 5e8
            "interestRate" : 0.05,        // Game default is 0.08
            "requiredDailyRevenue" : 1e7, // Game default is 1e8
        },
        "LARGE" : { // Parameters for the largest bond
            "principal" : 1e10,           // Game default is 1e9
            "interestRate" : 0.02,        // Game default is 0.06
            "requiredDailyRevenue" : 5e7, // Game default is 2e8
        },
    },
    
    "changeConstructionCosts" : true, // true or false.  Determines whether to change the construction cost multipliers
    "single_multiplier" : 0.5, // Price of a single station relative to a parallel station.  Game default is 0.75
    "quad_multiplier" : 2,     // Price of a quad   station relative to a parallel station.  Game default is 1.5
    "elevation_multipliers" : [1, 0.75, 0.5, 0.1, 0.4], // Price multipliers based on elevation.  Ordering is [deep bore, standard tunnel, cut and cover, at game, elevated].  Game default is [4.5, 2, 1, 0.3, 0.8]
    "water_multipliers" : [1.1, 1.4, 2, 5, 1], // Price multipliers when building under/over water.  Ordering is [deep bore, standard tunnel, cut and cover, at game, elevated].  Game default is [1.44444, 1.5, 3, 10, 2.5]
    "elevation_thresholds" : [-100, -49, -24, -10, 4], // The first depth/height where each elevation type occurs.  Ordering is [deep bore, standard tunnel, cut and cover, at game, elevated].  Game default is [-100, -24, -10, -3, 4.5] 
};

export default config;
```

## Usage
### The GUI method
The recommended way to use this mod is via the Patcher's GUI.  This provides a simple way to select your desired changes, input new values for various settings, save the config, and patch the game.  
1. After ensuring that `settingsTweaks` is located within `subwaybuilder-patcher/patcher/packages/`, launch the GUI using the correct script for your OS (Start_GUI.bat for Windows, and Start_GUI.sh for Linux and Mac).  This will open a page in your browser where you can edit configs for the Patcher.
2. Check the box for "Settings Tweaks" in the top left of the GUI to enable it.
3. Click on the "Config" button next to "Settings Tweaks".  A list of available settings will appear below that.
4. For any setting you wish to change, check the box next to it.  This will expand that box so that the various settings associated with it are available to change.  It will initially populate with the values in your existing `config.js` file if it already exists, and if it doesn't exist then it populates with the Subway Builder default values.
5. After setting everything you wish to change, click on "Save Settings" at the bottom left of the screen.
6. After configuring all mods you wish to patch into the game, click on "START PATCHING" in the bottom right.  Above this button, you will begin seeing details about the patching process.  Wait patiently while it finishes.
7. Once it finishes, look in the `subwaybuilder-patcher` directory and you will find the patched game.  Launch that and enjoy!

### The manual method
1. Set up the `settingsTweaks` `config.js` file.  See the "Config" section for details on this.
2. In the patcher `config.js` (located in the `subwaybuilder-patcher` folder, NOT `settingsTweaks`), ensure you have `"settingsTweaks"` included in the `"packagesToRun"`.  The ordering of `settingsTweaks` in `"packagesToRun"` should not matter, as long as the other packages are not also changing the settings controlled here (keep in mind that other mods may have special ordering requirements here!).  For example, if you wanted to use this in addition to the `mapPatcher`, your patcher `config.js` might look something like this:
```js
const config = {
  "subwaybuilderLocation": "C:\\Users\\[username]\\AppData\\Local\\Programs\\Subway\ Builder\\", // appimage location image on linux or install directory on windows (something like C:\\Users\\[username]\\AppData\\Local\\Programs\\Subway\ Builder)
  "platform": "windows", // either 'linux' or 'windows'
  "packagesToRun": ["mapPatcher", "settingsTweaks"]
};

export default config;
```

3. Run the Patcher.  Wait while it finishes.
4. Once it finishes, look in the `subwaybuilder-patcher` directory and you will find the patched game.  Launch that and enjoy!

## Questions, issues, requests?
If you run into any challenges setting up and using this mod, or if you have requests for additional settings to tweak, you can open an issue here on GitHub or contact @slurry on the Discord.
