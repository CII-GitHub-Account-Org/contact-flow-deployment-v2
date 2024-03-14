// src/createContactFlow.js

const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({region: 'us-east-1'});

// Create an Amazon Connect service object
const connect = new AWS.Connect({apiVersion: '2017-08-08'});

// Define your contact flow details
const contactFlowDetails = {
    "Metadata": {
      "entryPointPosition": {
        "x": 50,
        "y": 50
      },
      "snapToGrid": false,
      "ActionMetadata": {
        "entryPoint": {
          "text": "Entry point",
          "visible": false
        }
      }
    },
    "StartAction": "entryPoint",
    "Actions": {
      "entryPoint": {
        "Type": "EntryPoint",
        "Parameters": {},
        "Transitions": {
          "NextAction": "endFlow",
          "Errors": [],
          "Conditions": []
        }
      },
      "endFlow": {
        "Type": "EndFlow",
        "Parameters": {},
        "Transitions": {}
      }
    }
  };

// Function to create contact flow
async function createContactFlow() {
  try {
    const params = {
      InstanceId: '4bbee21d-72b8-442b-af39-dce4128ca77e', // replace with your instance id
      // arn:aws:connect:us-east-1:750344256621:instance/4bbee21d-72b8-442b-af39-dce4128ca77e
      Name: 'copilot-test-contact-flow', // replace with your contact flow name
      Type: 'CONTACT_FLOW',
      Description: 'test flow for copilot', // replace with your description
      Content: JSON.stringify(contactFlowDetails),
    };

    const response = await connect.createContactFlow(params).promise();
    console.log(`Contact flow created with ARN: ${response.ContactFlowArn}`);
  } catch (error) {
    console.error(`Error creating contact flow: ${error}`);
  }
}

// Call the function to create the contact flow
createContactFlow();