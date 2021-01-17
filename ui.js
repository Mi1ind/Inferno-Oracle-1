import { CreateNeuralNetwork, train, prediction } from '.'
import { read_csv } from './data';
const ARDUINO_DATA = "arduino/test_data.csv";
const status_bar = document.getElementById("status_bar");
const training_bar = document.getElementById("training_bar");
const regeneratorRuntime = require("regenerator-runtime");



export function updateStatus(msg) {
    status_bar.innerHTML = msg
}

export function updateFinalResult(curr_epoch, EPOCHs) {
    let msg = `EPOCH: ${curr_epoch + 1} of ${EPOCHs} completed...`
    training_bar.innerHTML = msg
}


export function updateTrainingStatus(train_loss, val_loss, test_loss, m_accuracy) {
    let msg = `<p>Final Training Loss: ${train_loss.toFixed(4)}</p>
                <p>Final Validation Loss: ${val_loss ? val_loss.toFixed(4) : '...'}</p><hr>
                <p>Final Test Loss: ${test_loss? test_loss.toFixed(4): '...'}</p>
                <p>Accuracy: ${m_accuracy? m_accuracy.toFixed(2): '...'} % </p>` //check if loss is undefined
    training_bar.innerHTML = msg
}


export async function setUp() {
    const trainModel = document.getElementById('trainModel')
    let model;

    trainModel.addEventListener('click', async () => {
        model = CreateNeuralNetwork();
        await train(model);
        
        let predData = await read_csv(ARDUINO_DATA);
        prediction(model, predData);
    }, false);
}