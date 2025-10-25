FROM node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# npm v10: usa --omit=dev
RUN npm ci --omit=dev

# Copiamos el código
COPY . .

USER appuser
EXPOSE 3000
CMD ["npm", "start"]
