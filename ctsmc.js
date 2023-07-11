#!/usr/bin/env node

const inquirer = require('inquirer');
const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

// Template paths
const templateDir = path.join(__dirname, 'templates');
const indexTemplatePath = path.join(templateDir, 'index.tsx.ejs');
const scssTemplatePath = path.join(templateDir, 'index.module.scss.ejs');

// Prompt questions
const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'Enter the name of the component:',
  },
];

// Main function to create the component
async function createComponent() {
  try {
    // Prompt for component name
    const answers = await inquirer.prompt(questions);
    const { componentName } = answers;

    // Create component directory
    const componentDir = path.join(process.cwd(), componentName);
    await fs.ensureDir(componentDir);

    // Create index.tsx file
    const indexFilePath = path.join(componentDir, 'index.tsx');
    const indexTemplateContent = await fs.readFile(indexTemplatePath, 'utf8');
    const indexFileContent = ejs.render(indexTemplateContent, { componentName });
    await fs.writeFile(indexFilePath, indexFileContent);

    // Create index.module.scss file
    const scssFilePath = path.join(componentDir, 'index.module.scss');
    const scssTemplateContent = await fs.readFile(scssTemplatePath, 'utf8');
    await fs.writeFile(scssFilePath, scssTemplateContent);

    console.log('Component created successfully!');
  } catch (error) {
    console.error('Error creating component:', error);
  }
}

createComponent().catch(console.error);
