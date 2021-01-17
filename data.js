const PAPA = require('papaparse');
const BASE_PATH = "https://raw.githubusercontent.com/Mi1ind/Inferno-Oracle-1/master/data/";
const TRAIN_DATA = "forestfires-train-min.csv";
const TEST_DATA = "forestfires-test-min.csv";
const TRAIN_TARGET = "forestfires-train-target-min.csv";
const TEST_TARGET = "forestfires-test-target-min.csv";
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