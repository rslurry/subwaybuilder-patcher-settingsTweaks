const config = {
    "changeGameSpeeds" : false, // true or false. Determines whether to change the simulation speeds
    "gameSpeeds" : [1, 25, 250, 500], // Simulation speed factor for each game speed - game default is [1, 25, 250, 500] - I recommend [1, 100, 1000, 4000]
    
    "changeMinTurnRadius" : false, // true or false. Determines whether to change the minimum allowed turn radius when building tracks
    "minTurnRadius" : 29, // Minimum allowed turn radius in meters - game default is 29
    
    "changeMaxSlope" : false, // true or false. Determines whether to change the maximum allowed slope percentage when building tracks
    "maxSlope" : 4, // Maximum allowed slope percentage - game default is 4
    
    "changeStartingMoney" : false, // true or false. Determines whether to change the starting money and/or number of train cars for new games
    "startingMoney" : 3, // Starting money in billions - game default is 3 billion
    "startingTrainCars" : 30, // Starting amount of train cars.  Game default is 30
    
    "changeScissorLength" : false, // true or false.  Determines whether to change the length of the crossovers created via the construction menu's button
    "scissorLength" : 40, // Length of the crossover in meters - game default is 40
    
    "changeBonds" : false, // true or false.  Determines whether to change the bond parameters
    "bondParameters" : {
        "SMALL" : { // Parameters for the smallest bond
            "principal" : 1e8,            // Bond amount - game default is 1e8
            "interestRate" : 0.1,         // Interest rate - game default is 0.1
            "requiredDailyRevenue" : 1e7, // Daily revenue required to take the bond - game default is 1e7
        },
        "MEDIUM" : { // Parameters for the medium-sized bond
            "principal" : 5e8,            // Game default is 5e8
            "interestRate" : 0.08,        // Game default is 0.08
            "requiredDailyRevenue" : 1e8, // Game default is 1e8
        },
        "LARGE" : { // Parameters for the largest bond
            "principal" : 1e9,            // Game default is 1e9
            "interestRate" : 0.06,        // Game default is 0.06
            "requiredDailyRevenue" : 2e8, // Game default is 2e8
        },
    },
    
    "changeConstructionCosts" : false, // true or false.  Determines whether to change the construction cost multipliers
    "single_multiplier" : 0.75, // Price of a single station relative to a parallel station.  Game default is 0.75
    "quad_multiplier" : 1.5,    // Price of a quad   station relative to a parallel station.  Game default is 1.5
    "elevation_multipliers" : [4.5, 2, 1, 0.3, 0.8], // Price multipliers based on elevation.  Ordering is [deep bore, standard tunnel, cut and cover, at grade, elevated].  Game default is [4.5, 2, 1, 0.3, 0.8]
    "water_multipliers" : [1.44444, 1.5, 3, 10, 2.5], // Price multipliers when building under/over water.  Ordering is [deep bore, standard tunnel, cut and cover, at grade, elevated].  Game default is [1.44444, 1.5, 3, 10, 2.5]
    "elevation_thresholds" : [-100, -24, -10, -3, 4.5], // The first depth/height where each elevation type occurs.  Ordering is [deep bore, standard tunnel, cut and cover, at grade, elevated].  Game default is [-100, -24, -10, -3, 4.5] 
  };
  
  export default config;
