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


## Deploying to staging/production

Thus far the options when it comes to deploying meteor applications are hosting it on meteor.com, using modulus, and your own private server.


### Hosting on meteor

Meteor takes care of deploying to staging for you.

```bash
meteor deploy adej-microscope.meteor.com
```

This command hosts it on meteors servers. Simple, easy. You just need a meteor developer account.

### Private server (meteor up, mup)

```bash
npm install -g mup
mkdir ./adej-microscope-deploy
echo "adej-microscope-deploy" >> .gitignore
cd ./adej-microscope-deploy
mup init
```

MUP creates two files for you. `settings.json` and `mup.json`. Inside `settings.json` you find the all the application related settings. `mup.json` holds the deployment settings. Fill in the `settings.json`.

Deploying to the private server turned out to be easy. If you don't feel like hosting the application on port 80. I hosted mine on 8000 and used Nginx to proxy the requests.

```bash
server {
  listen 80;
  server_name adej-microscope.alleneubank.com;

  location / {
    proxy_pass http://localhost:8000;
    proxy_set_header X-Real-IP $remote_addr;  # http://wiki.nginx.org/HttpProxyModule
    proxy_http_version 1.1;  # recommended for keep-alive connections per http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_http_version
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
  location ~* "^/[a-z0-9]{40}\.(css|js)$" {
    root /opt/app-name/app/programs/web.browser/;
    access_log off;
    expires max;
  }
}
```

```bash
mup setup

mup deploy
```

## Templates

Meteor uses Spacebars to handle templating. Spacebars is HTML with some additions. The additions allow the including partials, expressions and block helpers.

Helpers give templates the power to give templates logic and massage data into the view correctly. A helper is created by adding a new key to meteors special variable named `Template`.  Every named template is added to the `Template` variable. Then when adding a helper to a named template value, it makes that custom helper available to the HTML file.

## Colllections

A special data structure that is permanently stored on the server side in the database. It is synchronized with each user's browser.

```JavaScript
Posts = new Mongo.Collection('posts'); // Creating a Mongo collection 
```

Meteor synchronizes data across users by using browser memory, browser's local storage, and the database.

Meteor uses the `autopublish` package to sync the whole database with each connected client. It is not meant for production environments. To publish `Posts` so that they are available requires using the `publish/subscribe` which takes the collection name.

## Publications and Subscriptions

In meteor, publishing makes records in the database available to the client. This is how you lock down your application. You only publish what you want the client to see. Parameterized publications allow the client to retrieve subsets of the database which allows for scalability.

The `Autopublish` takes care of publishing and subscribing by automatically including all the data on the server on the client.

## Routing

