# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5080

# Set build-time environment variable for MongoDB URI
ARG MONGODB_URI

# Set the environment variable for MongoDB URI
ENV MONGODB_URI=${MONGODB_URI}

# Start the server
CMD ["npm", "run", "start-backend"]