# Chrome Extension README

## Introduction
This README file provides instructions on how to run the Chrome extension and set up the necessary components.

## Prerequisites
Before running the Chrome extension, make sure you have the following:

1. Google Chrome browser installed on your machine.
2. The "files" folder containing the necessary files for the extension.
3. Flask server set up to handle API requests.

## Installation
Follow these steps to install and run the Chrome extension:

1. Enable Developer Mode in Chrome:
    - Open Google Chrome and go to the "Manage Extensions" page.
    - Enable the "Developer Mode" toggle switch.

2. Upload the "files" folder to Chrome:
    - Click on the "Load unpacked" button.
    - Select the "files" folder from your local machine.

3. Run the Flask server:
    - Start the Flask server that will handle API requests.
    - Make sure the server is running on the specified port.

## Important Note
Please note that the GPT model used by the extension may not work initially. To make it work, you need to create a file named "hidden.txt" (or any other name) that holds your API key. This file should be placed in the appropriate location and the path should be specificed in the chrome_extention.py file

## Usage
Once the Chrome extension and Flask server are set up, follow these steps to use the extension:

1. Open Google Chrome and navigate to a webpage.
2. Click on the extension icon in the toolbar to activate it.
3. Interact with the extension as per its functionality.

## Troubleshooting
If you encounter any issues while running the Chrome extension, consider the following troubleshooting steps:

1. Ensure that the "files" folder is correctly uploaded to Chrome.
2. Verify that the Flask server is running and accessible.
3. Double-check the API key file ("hidden.txt") and its location within the "files" folder.

## License
This Chrome extension is released under the [MIT License](https://opensource.org/licenses/MIT).

