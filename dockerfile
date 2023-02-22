# Use an official Node.js runtime as a parent image
FROM node:18.14.1

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 5000 to the outside world
EXPOSE 5000

# Define the command to run when the container starts
CMD ["npm", "start"]