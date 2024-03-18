# Use the official Node.js 14 image as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your application (optional, depending on your app)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Run your application
CMD ["npm", "start"]