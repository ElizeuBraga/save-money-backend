    # devops/Dockerfile
FROM node:22

RUN apt-get update -y && \
    apt-get install -y libaio1 unzip netcat-openbsd

WORKDIR /app
COPY . .

RUN npm install -g @nestjs/cli

RUN npm install
RUN npm run build

# ENTRYPOINT ["/app/devops/entrypoint.sh"]
CMD ["npm", "run", "start:prod"]