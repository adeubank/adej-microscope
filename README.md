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
