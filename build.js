// Import the required Node.js modules
const { exec } = require('child_process');
const path = require('path');

// Run a command and handle the output and errors
const runCommand = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
};

// Define the sequence of tasks to be performed
const buildProject = async () => {
  try {
    console.log("Running npm ci in the root directory...");
    await runCommand('npm ci');

    console.log("Starting development server...");
    runCommand('npm run dev'); // Run dev server without waiting (it stays open)

    console.log("Changing directory to app/src...");
    const appSrcPath = path.join(__dirname, 'app', 'src');
    
    console.log("Running npm ci in app/src...");
    await runCommand('npm ci', { cwd: appSrcPath });

    console.log("Starting app in app/src...");
    await runCommand('npm start', { cwd: appSrcPath });

    console.log("Build and start script completed successfully.");
  } catch (error) {
    console.error("Build process failed.", error);
  }
};

// Execute the build process
buildProject();
