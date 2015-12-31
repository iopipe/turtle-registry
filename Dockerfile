FROM node:onbuild

EXPOSE 80

# For localfs driver
RUN mkdir -p /root/.iopipe/filter_cache
