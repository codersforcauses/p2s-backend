FROM node:10-alpine

# make the 'p2srw' folder the current working directory
WORKDIR /p2srw

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --only=production

RUN npm install pm2 -g

# copy project files and folders to the current working directory (i.e. 'p2srw' folder)
COPY . .

ENV NODE_ENV=production

ARG envvar
ENV ENV_KEY=${envvar}

EXPOSE 80
ENV PORT 80

CMD ["pm2-runtime","src/"]
