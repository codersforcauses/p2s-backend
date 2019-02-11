FROM node:11-alpine

# make the 'p2srw' folder the current working directory
WORKDIR /p2srw

# copy both 'package.json' and yarn.lock files
COPY package.json .
COPY yarn.lock .

# install yarn globally
RUN npm install yarn -g

# install project dependencies
RUN yarn install --production --ignore-optional --silent

RUN yarn global add pm2 --silent

# copy project files and folders to the current working directory (i.e. 'p2srw' folder)
COPY . .

ENV NODE_ENV=production

ARG envvar
ENV ENV_KEY=${envvar}

EXPOSE 80
ENV PORT 80

CMD ["pm2-runtime","src/"]
