FROM node:11.15.0 AS installer

WORKDIR /app

COPY package.json ./

RUN npm install --quiet

# Building stage
FROM installer AS builder

WORKDIR /app

COPY ./src src
COPY webpack.config.js .

RUN npm run build

# Running code under slim image
FROM node:11.15-slim

# Change timezone to America/Bahia
RUN	export DEBIAN_FRONTEND=noninteractive && \
	apt-get install -y tzdata && \
	ln -fs /usr/share/zoneinfo/America/Bahia /etc/localtime && \
	dpkg-reconfigure --frontend noninteractive tzdata

WORKDIR /app

EXPOSE 3000

## We just need the build and package to execute the command
COPY --from=builder /app/dist dist

CMD [ "node", "dist/index.bundle.js" ]
