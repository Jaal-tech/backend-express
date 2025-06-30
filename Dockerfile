FROM node:18

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of your app source code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
