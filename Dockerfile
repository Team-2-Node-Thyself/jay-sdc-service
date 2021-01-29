FROM node:12-alpine
WORKDIR /similar-items
COPY . .
RUN npm install
RUN npm build
CMD ["node", "server/index.js"]