# Inferno Oracle 1

## Inspiration

Since the start of 2019, there have been numerous issues with controlling wildfires, many notable examples being the California wildfires, Australian wildfires, and Amazon forest fires. These fires are started by both natural phenomena and human activity, the breakdown being 47% by lightning strikes, 49% by human activity, and 4% by other means. We wanted to create a project that helps with not only mitigating wildfires, but also preventing them, which can help save millions in financial resources, and reduce the impact of wildfires on those who live nearby as well as the rest of the world. The current approach that many fire watch organizations take is mainly focused on the mitigation of damage and is primarily done with the use of satellite imaging.

## What it does

So what was our approach? Well, we decided to go down the IoT route by using an Arduino as our base unit whose goal is to use sensor data to feed a machine learning model. This means that we are able to deploy these small devices in high-risk zones to monitor them 24/7. The device would collect data on temperature, humidity, wind, rain, and CO2 emissions to predict the likelihood of a fire, and in a worst case scenario, act as a direct detection system.

## How we built it

There are 3 aspects to our project:
The Neural Network: We used data sets collected for a research paper to train our machine learning model. We used Tensorflow.js to train the model which would then be used in tandem with our hardware unit to predict the likelihood of a forest fire occurring.
The Hardware: We connected a UNO R3 with a DHT11 sensor which collected temperature and humidity values from the surroundings. This was shown on an LCD display also connected to the UNO R3 unit. The data was processed by python and was exported to a CSV file which would then be read by the Machine Learning model to predict an outcome.
The Data Visualization: The loss, validation loss, and accuracy were processed and then displayed using TFVIS and are a visual representation of the effectiveness of the model. The data points were also converted from a CSV file to a GEOJSON file which was then used to display all the recent North American forest fires. 

## Challenges we ran into

This was our first time learning about and using machine learning. It was also our first time connecting hardware with machine learning, and visualizing data of our ML model. 

Time management was a huge obstacle. We had planned to be a team of 4 people, but last-minute changes resulted in our teammates opting out leaving just the two of us to complete all these tasks. Since we did not have a team to allocate tasks to, it fell upon the both of us to support each other and take on every single role from the front-end to the back-end, to the hardware. It was a complete team effort and without our continuous communication and time management, we would not have completed our hack in time.


## Accomplishments that we’re proud of and what we learned

Finding data for this project was extremely difficult with a majority of the available data either not containing the required attributes, or simply using different methods (satellite data). The one dataset we did manage to find was only contained around 500 data points. This made it extremely difficult to train our model and get accurate predictions as we had to split it up into training and validation to teach our model. However, within the span of a day, we managed to learn quite a lot about Neural Networks and how they function with respect to their activation functions, loss functions, and overall training and evaluation methods. 

Since we couldn’t really get an out-of-the-box model that we simply needed to tweak for our project, we had to learn how to break down our requirements, choosing the appropriate algorithm and approach. For example, we had to realize that our approach would be that of a binary classifier, and so our options were limited to logistic regression or support vector machines. Both looked quite daunting to implement and it was extremely satisfying to learn how to implement a simple logistic regression, and then optimize our Neural Networks to go beyond by adding additional hidden layers. It took us 12 hours to increase our accuracy from 46.6% to 50%. But after we learned of the issue with our data, we knew exactly where to focus our efforts and managed to increase it to 93%.


## What's next for Inferno Oracle

* Use Arduino Nano 33 Ble Sense (much smaller, has more sensors, least environmental impact)
* Use TensorFlow Lite so that the model will be on the hardware itself (will not need wifi/browser/)
