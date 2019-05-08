FROM node:11-alpine

# make the 'p2srw' folder the current working directory
WORKDIR /backend

# copy both 'package.json' and yarn.lock files
COPY package.json yarn.lock ./

# install project dependencies
RUN yarn install --production --ignore-optional --silent

RUN yarn global add pm2 --silent

# copy project files and folders to the current working directory (i.e. 'p2srw' folder)
COPY . .

ENV NODE_ENV=production

ARG envvar
ENV ENV_KEY=${envvar}

ARG db
ENV DB_PATH=${db}

ARG host
ENV HOST=${host}

ARG port
ENV PORT=${port}
EXPOSE ${port}

CMD ["pm2-runtime","src/"]
