FROM node:22 as production-stage

MAINTAINER Elizeu Braga
# set default timezone env variable and set env variable for node not checking tls
ARG timezone=America/Fortaleza
ENV TZ=$timezone

# set container timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; \
    echo $TZ > /etc/timezone

# set workdir and copy local files to it
WORKDIR /app
COPY . .