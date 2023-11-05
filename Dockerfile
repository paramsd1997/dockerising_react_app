# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /searchtool

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Expose a port (e.g., 80) that the application will listen on
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]
