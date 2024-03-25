const fs = require('fs');
const yaml = require('js-yaml');

// Read the JSON files
const flow1Content = fs.readFileSync('src/flow1.json', 'utf8');
const flow2Content = fs.readFileSync('src/flow2.json', 'utf8');

// Parse the JSON files
const flow1Json = JSON.parse(flow1Content);
const flow2Json = JSON.parse(flow2Content);

// Read the CloudFormation template
const cfTemplateContent = fs.readFileSync('template.yaml', 'utf8');
const cfTemplate = yaml.load(cfTemplateContent);

// Update the Content property
cfTemplate.Resources.Flow1.Properties.Content = JSON.stringify(flow1Json);
cfTemplate.Resources.Flow2.Properties.Content = JSON.stringify(flow2Json);
console.log(cfTemplate.Resources.Flow1.Properties.Content);
console.log(cfTemplate.Resources.Flow2.Properties.Content);
// Write the updated CloudFormation template
const updatedCfTemplateContent = yaml.dump(cfTemplate);
fs.writeFileSync('template.yaml', updatedCfTemplateContent);