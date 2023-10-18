FROM oven/bun

WORKDIR /app

COPY package*.json ./
COPY bun.lockb .

RUN bun install --production

COPY . ./

ENV NODE_ENV production
CMD ["bun", "app/src/index.ts"]

EXPOSE 3001