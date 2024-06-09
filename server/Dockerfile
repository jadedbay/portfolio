FROM node:18-alpine
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install
# Copy the rest of your application
COPY . .

# Command to run your application
CMD ["npm", "run", "dev"]
