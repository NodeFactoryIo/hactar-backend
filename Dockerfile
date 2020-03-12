FROM node:12.13-alpine as dev

WORKDIR /usr/app

# Install node dependencies - done in a separate step so Docker can cache it.
COPY yarn.lock .
COPY package.json .

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn run compile

RUN chown -R node: .

USER node

FROM node:12.13-alpine as production

WORKDIR /app

COPY --from=dev /usr/app/dist/src /app
COPY --from=dev /usr/app/package.json /app/
COPY --from=dev /usr/app/yarn.lock /app/

RUN yarn install --frozen-lockfile --production && yarn cache clean

CMD ["node", "index.js"]
