#!/bin/sh
eval "echo \"$(cat etc/config.json.tpl)\"" > etc/config.json

npm start
