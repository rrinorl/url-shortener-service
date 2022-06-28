FROM node:16.15.1 as base
LABEL description="url-shortener-service Description tbd..."

WORKDIR /home/node/app

#Copy and install dependencies

COPY package*.json  ./
RUN npm i

#Copy prisma related files
COPY prisma ./prisma/
COPY tsconfig*.json ./
RUN npx prisma generate

#Copy project files except those listed in .dockerignore

COPY . .

# Copy remaining items to build folder
#COPY src/api/openapi.yaml ./build/src/api
#COPY src/schemas/*.yaml ./build/src/schemas/


#Production steps
FROM base as production

ENV NODE_PATH=./build

RUN npm run build

