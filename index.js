import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { ForestDataset, FEATURE_NAMES } from './data';
import { normalizeData } from './utils'
import * as ui from './ui';
import regeneratorRuntime from "regenerator-runtime";
import { outerProduct, tensor } from '@tensorflow/tfjs';


const forestdata = new ForestDataset();
const tensors = {}

const LEARNING_RATE = 0.01
const EPOCHS = 50
const BATCH_SIZE = 32

/**
 * Convert Array of Arrays to Tensors, and normalize the features
 */
export function arrayToTensor() {
    tensors['Xtrain_tf'] = normalizeData(tf.tensor2d(forestdata.Xtrain));
    tensors['Xtest_tf'] = normalizeData(tf.tensor2d(forestdata.Xtest));
    tensors['ytrain_tf'] = normalizeData(tf.tensor2d(forestdata.ytrain));
    tensors['ytest_tf'] = normalizeData(tf.tensor2d(forestdata.ytest));
}

export function CreateNeuralNetwork(){
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: [forestdata.dataShape],
        units: 32,
        activation: 'relu',
    }));
    model.add(tf.layers.dense({
        units: 16,
        activation: "relu",
    }));
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
    }));

    model.summary();
    return model;
}

/**
 * Trains the neural Network and prints the result
 */
export async function train(model){
    let trainingLogs = [];
    let chartbox = document.getElementById('chart')

    model.compile({
        optimizer: tf.train.adam(LEARNING_RATE),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy'],
    });

    ui.updateStatus("Training started....")

    await model.fit(tensors.Xtrain_tf, tensors.ytrain_tf,{
        batchSize: BATCH_SIZE,
        epochs: EPOCHS,
        validationSplit: 0.2,
        callbacks:{
            onEpochEnd: async(curr_epoch, logs)=>{
                await ui.updateTrainingStatus(curr_epoch, EPOCHS)
                trainingLogs.push(logs);
                //plot the training chart
                tfvis.show.history(chartbox, trainingLogs, ['loss', 'val_loss', 'acc'])       
            }
        }
    });

    ui.updateStatus("Evaluating model on test data")
    const result = model.evaluate(tensors.Xtest_tf, tensors.ytest_tf, {
        batchSize: BATCH_SIZE,
    });

    const m_accuracy = result[1].dataSync()[0] * 100;
    const test_loss = result[0].dataSync()[0];
    const train_loss = trainingLogs[trainingLogs.length - 1].loss;
    const val_loss = trainingLogs[trainingLogs.length - 1].val_loss;
    await ui.updateTrainingStatus(train_loss, val_loss, test_loss, m_accuracy)
};

export function prediction(model, data) {
        let predData = normalizeData(tf.tensor2d(data));  
        const pred = model.predict(predData, {
            batchSize: 2
        });
        pred.print();
}

//Download and convert data to tensor as soon as the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    ui.updateStatus("Loading Data set and Converting to Tensors....")
    await forestdata.loadAllData()
    arrayToTensor();
    ui.updateStatus("Data Loaded Successfully....")
    document.getElementById('trainModel').style.display = 'block'
    await ui.setUp()
}, false);
