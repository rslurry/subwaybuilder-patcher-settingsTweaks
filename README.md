## Dependencies
- No additional dependencies beyond the patcher

## Available settings
- Change the game simulation speeds associated with 1, 2, 3, and 4 speed
- Change the minimum allowed turn radius
- Change the maximum allowed slope percentage
- Change the starting money amount

## Installation
First, download and install Kronifer's patcher: https://github.com/Kronifer/subwaybuilder-patcher

Once that is set up, navigate to the `packages` folder.  Assuming you are currently in the `subwaybuilder-patcher` folder, then do 
```
cd patcher/packages
```

In the packages directory, clone this repository into a folder named `settingsTweaks`:
```
git clone https://github.com/rslurry/subwaybuilder-patcher-settingsTweaks ./settingsTweaks
```

You're now ready to set up the `settingsTweaks` configuration file.  See the next section for details.

## Config
Like the `subwaybuilder-patcher` and `mapPatcher`, `settingsTweaks` is controlled by a configuration file named `config.js`.  The configuration file will specify which settings you wish to change and what you wish to set them to.  Each setting can be independently controlled - so if you don't want to change the maximum slope percentage, then turn that off by setting it to `false`.  The `config_example.js` file should give you a good idea how to use it.  Here is an example `config.js` that changes all currently implemented settings:
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
};

export default config;
```

## Usage
To use `settingsTweaks`, in your patcher `config.js` (located in the `subwaybuilder-patcher` folder, NOT `settingsTweaks`), ensure you have `"settingsTweaks"` included in the `"packagesToRun"`.  For example, if you wanted to use this in addition to the `mapPatcher`, your patcher `config.js` might look something like this:
```
js
const config = {
  "subwaybuilderLocation": "C:\\Users\\[username]\\AppData\\Local\\Programs\\Subway\ Builder\\", // appimage location image on linux or install directory on windows (something like C:\\Users\\[username]\\AppData\\Local\\Programs\\Subway\ Builder)
  "platform": "windows", // either 'linux' or 'windows'
  "packagesToRun": ["mapPatcher", "settingsTweaks"]
};

export default config;
```

The ordering of `settingsTweaks` in `"packagesToRun"` should not matter, as long as the other packages are not also changing the settings controlled here.

Enjoy.
