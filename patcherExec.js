import fs from 'fs';
import config from './config.js';
import { execSync } from 'child_process';

const stringReplaceAt = (string, startIndex, endIndex, replacement) => {
    return string.substring(0, startIndex) + replacement + string.substring(endIndex + 1);
};

export function patcherExec(fileContents) {
    console.log("Running settingsTweaks - contributed by slurry");
    
    ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
      if (fileContents[key] == undefined) {
        throw new Error(`'${key}' is undefined.` + 
                        "\nThe likely problem is that your patcher is out of date.\n" +
                        "Run 'git pull origin main', then try running the patcher again.\n" +
                        "If you still see this error after updating the patcher to the latest version,\n" +
                        "raise an issue on GitHub or contact @slurry on Discord.")
      }
    });
    
    if (config.changeGameSpeeds) {
        console.log(`Changing game simulation speeds to ${config.gameSpeeds}`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          fileContents[key] = fileContents[key]
            .replace(/"slow":[\s]*[0-9]+/, `"slow": ${config.gameSpeeds[0]}`)
            .replace(/"normal":[\s]*[0-9]+/, `"normal": ${config.gameSpeeds[1]}`)
            .replace(/"fast":[\s]*[0-9]+/, `"fast": ${config.gameSpeeds[2]}`)
            .replace(/"ultrafast":[\s]*[0-9]+/, `"ultrafast": ${config.gameSpeeds[3]}`);
        });
    }
    
    if (config.changeMinTurnRadius) {
        console.log(`Changing minimum allowed turn radius to ${config.minTurnRadius} m`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          fileContents[key] = fileContents[key].replace(
            /("MIN_TURN_RADIUS":)[\s]*[^,]*/,
            `$1 ${config.minTurnRadius}`
          );
        });
    }

    
    if (config.changeMaxSlope) {
        console.log(`Changing maximum slope percentage to ${config.maxSlope}`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          fileContents[key] = fileContents[key].replace(
            /("MAX_SLOPE_PERCENTAGE":)[\s]*[\d.]+/,
            `$1 ${config.maxSlope}`
          );
        });
        
        if (config.maxSlope > 4) {
            ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
              let occurrence = 0;
              fileContents[key] = fileContents[key].replace(/("maxSlopePercentage":)[\s]*[^,]*/g, (match, group1) => {
                occurrence++;
                if (occurrence === 2) {
                  return `${group1} ${config.maxSlope}`; // replace only the 2nd occurrence
                }
                return match; // leave others unchanged
              });
            });
        }
    }
    
    if (config.changeStartingMoney) {
        console.log(`Changing starting money amount to ${config.startingMoney} billion`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          if (config.startingMoney) {
              fileContents[key] = fileContents[key].replace(
                /("STARTING_MONEY":)[\s]*[\d.]+/,
                `$1 ${config.startingMoney}`
              );
          }
          
          if (config.startingTrainCars) {
              fileContents[key] = fileContents[key].replace(
                    /("STARTING_TRAIN_CARS":)[\s]*[\d.]+/,
                    `$1 ${config.startingTrainCars}`
              );
          }
        });
    }
    
    if (config.changeScissorLength) {
        console.log(`Changing scissor length to ${config.scissorLength} m`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          fileContents[key] = fileContents[key].replace(
            /("SCISSORS_CROSSOVER_LENGTH":)[\s]*[\d.]+/,
            `$1 ${config.scissorLength}`
          );
        });
    }
    
    if (config.changeBonds) {
        console.log(`Changing bond parameters`);
        
        for (const [bondType, props] of Object.entries(config.bondParameters)) {
          for (const [prop, newValue] of Object.entries(props)) {
            const regex = new RegExp(`("${bondType}":\\s*{[^}]*"${prop}":)\\s*[\\de.+-]+`);
            fileContents["INDEX"] = fileContents["INDEX"].replace(regex, `$1 ${newValue.toExponential(0).replace('e+', 'e')}`);
          }
          const regex = new RegExp(`("${bondType}":\\s*{[^}]*"principalPaymentRate":)\\s*[\\de.+-]+`);
          fileContents["INDEX"] = fileContents["INDEX"].replace(regex, `$1 ${(config.bondParameters[bondType]["interestRate"] / 100).toExponential()}`);
        }
    }
    
    if (config.changeConstructionCosts) {
        console.log(`Changing construction cost multipliers`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
            if (config.single_multiplier) {
                if (key == "INDEX") {
                    console.log(`Changing single cost multiplier to ${config.single_multiplier}x`);
                }
                fileContents[key] = fileContents[key].replace(
                  /("SINGLE_MULTIPLIER":)[\s]*[\d.]+/g,
                  `$1 ${config.single_multiplier}`
                );
            }
          
            if (config.quad_multiplier) {
                if (key == "INDEX") {
                    console.log(`Changing quad cost multiplier to ${config.quad_multiplier}x`);
                }
                fileContents[key] = fileContents[key].replace(
                  /("QUAD_MULTIPLIER":)[\s]*[\d.]+/g,
                  `$1 ${config.quad_multiplier}`
                );
            }
          
            if (config.elevation_multipliers) {
                if (key == "INDEX") {
                    console.log(`Changing elevation cost multipliers to ${config.elevation_multipliers}x`);
                }
                fileContents[key] = fileContents[key]
                  .replace(/("ELEVATION_MULTIPLIERS":\s*\{[^}]*"DEEP_BORE":\s*)[\d.]+/, `$1${config.elevation_multipliers[0]}`)
                  .replace(/("ELEVATION_MULTIPLIERS":\s*\{[^}]*"STANDARD_TUNNEL":\s*)[\d.]+/, `$1${config.elevation_multipliers[1]}`)
                  .replace(/("ELEVATION_MULTIPLIERS":\s*\{[^}]*"CUT_AND_COVER":\s*)[\d.]+/, `$1${config.elevation_multipliers[2]}`)
                  .replace(/("ELEVATION_MULTIPLIERS":\s*\{[^}]*"AT_GRADE":\s*)[\d.]+/, `$1${config.elevation_multipliers[3]}`)
                  .replace(/("ELEVATION_MULTIPLIERS":\s*\{[^}]*"ELEVATED":\s*)[\d.]+/, `$1${config.elevation_multipliers[4]}`);
            }
            
            if (config.water_multipliers) {
                if (key == "INDEX") {
                    console.log(`Changing water cost multipliers to ${config.water_multipliers}x`);
                }
                fileContents[key] = fileContents[key]
                  .replace(/("WATER_MULTIPLIERS":\s*\{[^}]*"DEEP_BORE":\s*)[\d.]+/, `$1${config.water_multipliers[0]}`)
                  .replace(/("WATER_MULTIPLIERS":\s*\{[^}]*"STANDARD_TUNNEL":\s*)[\d.]+/, `$1${config.water_multipliers[1]}`)
                  .replace(/("WATER_MULTIPLIERS":\s*\{[^}]*"CUT_AND_COVER":\s*)[\d.]+/, `$1${config.water_multipliers[2]}`)
                  .replace(/("WATER_MULTIPLIERS":\s*\{[^}]*"AT_GRADE":\s*)[\d.]+/, `$1${config.water_multipliers[3]}`)
                  .replace(/("WATER_MULTIPLIERS":\s*\{[^}]*"ELEVATED":\s*)[\d.]+/, `$1${config.water_multipliers[4]}`);
            }
            
            if (config.elevation_thresholds) {
                if (key == "INDEX") {
                    console.log(`Changing elevation thresholds to ${config.elevation_thresholds} m`);
                }
                fileContents[key] = fileContents[key]
                  .replace(/("ELEVATION_THRESHOLDS":\s*\{[^}]*"DEEP_BORE":\s*)[^,]*/, `$1${config.elevation_thresholds[0]}`)
                  .replace(/("ELEVATION_THRESHOLDS":\s*\{[^}]*"STANDARD_TUNNEL":\s*)[^,]*/, `$1${config.elevation_thresholds[1]}`)
                  .replace(/("ELEVATION_THRESHOLDS":\s*\{[^}]*"CUT_AND_COVER":\s*)[^,]*/, `$1${config.elevation_thresholds[2]}`)
                  .replace(/("ELEVATION_THRESHOLDS":\s*\{[^}]*"AT_GRADE":\s*)[^,]*/, `$1${config.elevation_thresholds[3]}`)
                  .replace(/("ELEVATION_THRESHOLDS":\s*\{[^}]*"ELEVATED":\s*)[^}]*/, `$1${config.elevation_thresholds[4]}`);
            }
        });

    }

    return fileContents;
}
