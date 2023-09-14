FROM node:16-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Privzeta mapa z aplikacijo za vse ukaze v nadaljevanju (COPY, RUN, CMD itd.).
WORKDIR /usr/src/app

# Kopiraj package.json in package-lock.json ter poskrbi za namestitev knjižnic.
# Docker bo poskrbel za medpomnjenje node_modules map, ki se ne bo spremenila,
# če ni prišlo do spremembe v package.json.
COPY package*.json ./
RUN npm install

# Kopiraj izvorno kodo aplikacije
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]