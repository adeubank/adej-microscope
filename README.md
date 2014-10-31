# Meteor Walkthrough

I am learning meteor! I created this project to demonstrate the book and the code it provides. I will also be using this file to take notes.

## Project Structure

* The `/server` directory contains code that only runs on the server.
* The `/client` directory contains code that only runs on the client.
* Everything else runs both on the client and the server
* Static assets go in the `/public`

### Load order

1. Files in `/lib`  load before everything else
2. All `main.*` files loaded right after.
3. Alphabetical order

### Dependencies

The `.meteor` directory contains meteor specific code. Try not to modify things in here too much. The only exceptions are `.meteor/packages` and `.meteor/release` files. These files list the packages and the version of meteor in use.


