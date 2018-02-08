# Code Registry

[![Greenkeeper badge](https://badges.greenkeeper.io/iopipe/turtle-registry.svg)](https://greenkeeper.io/)

Service for storing and searching for functions. These may be
pushed, pulled, and executed by
[IOpipe](https://github.com/iopipe/iopipe) on a variety
of serverless (or FaaS) platforms.

# Running in development.

Your machine will need `docker`, `docker-compose`, and GNU Make.

```
$ make run-dev
```

# Running with Docker in production.

Create an etc/config.json file (use etc/default-config.json as a
template). Use the official Docker image (`iopipe/registry`) or
build it youself using `docker build`.

Map your config.json file to /usr/src/app/etc/config.json within the
image.

Example:
```
$ docker run -d -v ./etc/config.json:/usr/src/app/etc/config.json
iopipe/registry
```

# Running with Node.

If you do not wish to use Docker, or seek to build your own images,
simply run `npm install` and `npm start`.

# License

Apache-2.0
