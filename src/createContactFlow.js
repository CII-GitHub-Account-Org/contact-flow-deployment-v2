// Import required AWS SDK clients and commands for Node.js
const { ConnectClient, CreateContactFlowCommand } = require("@aws-sdk/client-connect");

// Set the AWS Region
const REGION = "us-east-1"; //e.g. "us-east-1"

// Create an Amazon Connect service client object
const connect = new ConnectClient({ region: REGION });

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
            Name: 'copilot-test-contact-flow', // replace with your contact flow name
            Type: 'CONTACT_FLOW',
            Description: 'test flow for copilot', // replace with your description
            Content: JSON.stringify(contactFlowDetails),
        };

        const command = new CreateContactFlowCommand(params);
        const response = await connect.send(command);
        console.log(`Contact flow created with ARN: ${response.ContactFlowArn}`);
    } catch (error) {
        console.error(`Error creating contact flow: ${error}`);
    }
}

// Call the function to create the contact flow
createContactFlow();