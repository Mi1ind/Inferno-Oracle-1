const PAPA = require('papaparse');
const BASE_PATH = "https://raw.githubusercontent.com/Mi1ind/Inferno-Oracle-1/master/";
// const TRAIN_DATA = "data/forestfires-train.csv";
// const TEST_DATA = "data/forestfires-test.csv";
// const TRAIN_TARGET = "data/forestfires-train-target.csv";
// const TEST_TARGET = "data/forestfires-test-target.csv";

const TRAIN_DATA = "fires/forestfire_train.csv";
const TEST_DATA = "fires/forestfire_test.csv";
const TRAIN_TARGET = "fires/forestfire_train_target.csv";
const TEST_TARGET = "fires/forestfire_test_target.csv";

//////////////////////////////////////////////////////////////////////////////////////////////////

// const BASE_PATH = "https://raw.githubusercontent.com/risenW/tfjs-data/master/forestfire/";
// const TRAIN_DATA = "forestfire_train.csv";
// const TEST_DATA = "forestfire_test.csv";
// const TRAIN_TARGET = "forestfire_train_target.csv";
// const TEST_TARGET = "forestfire_test_target.csv";

export const FEATURE_NAMES = ['X','Y','month','day','temp','RH','wind','rain']
const regeneratorRuntime = require("regenerator-runtime");


/**
 * Parse the CSV Object into an array of array of numbers
 */
const convert_to_array = async (csv_file) => {
    return new Promise(resolve=>{
        let data = csv_file.map((row)=>{
            return Object.keys(row).map(key=> row[key])
        });
        resolve(data)
    })
}


/**
 * Reads the dataset from the specified path
 */
export const read_csv = async (csv_file) => {
    return new Promise(resolve => {
        const file_path = `${BASE_PATH}${csv_file}`;
        console.log(`Loading from ${file_path}`);
        PAPA.parse(file_path, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                resolve(convert_to_array(results['data']));
            }
        })
    })
}



/**
 * Helper class for loading train and test data
 */
 export class ForestDataset {
     constructor(){
         this.Xtrain = null;
         this.Xtest = null;
         this.ytrain = null;
         this.ytest = null;
     }

     get dataShape(){
         return this.Xtrain[0].length;
     }

     async loadAllData(){
         this.Xtrain = await read_csv(TRAIN_DATA)
         this.Xtest = await read_csv(TEST_DATA)
         this.ytrain = await read_csv(TRAIN_TARGET)
         this.ytest = await read_csv(TEST_TARGET)

     }
 }