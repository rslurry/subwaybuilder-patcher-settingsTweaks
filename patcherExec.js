import fs from 'fs';
import config from './config.js';
import { execSync } from 'child_process';

const stringReplaceAt = (string, startIndex, endIndex, replacement) => {
    return string.substring(0, startIndex) + replacement + string.substring(endIndex + 1);
};

export function patcherExec(fileContents) {
    console.log("Running settingsTweaks - contributed by slurry");
    if (config.changeGameSpeeds) {
        console.log(`Changing game simulation speeds to ${config.gameSpeeds}`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          if (fileContents[key] == undefined) {
            throw new Error(`'${key}' is undefined.` + 
                            "\nThe likely problem is that your patcher is out of date.\n" +
                            "Run 'git pull origin main', then try running the patcher again.\n" +
                            "If you still see this error after updating the patcher to the latest version,\nraise an issue on GitHub or contact @slurry on Discord.")
          }
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
            /("MAX_SLOPE_PERCENTAGE":)[\s]*[^,]*/,
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
          fileContents[key] = fileContents[key].replace(
            /("STARTING_MONEY":)[\s]*[^,]*/,
            `$1 ${config.startingMoney}e9`
          );
        });
    }
    
    if (config.changeScissorLength) {
        console.log(`Changing scissor length to ${config.scissorLength} m`);
        
        ["INDEX", "INTERLINEDROUTES", "POPCOMMUTEWORKER"].forEach(key => {
          fileContents[key] = fileContents[key].replace(
            /("SCISSORS_CROSSOVER_LENGTH":)[\s]*[^,]*/,
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

    return fileContents;
}
