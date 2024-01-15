# Use the official Node.js 18.19.0 image as a base
FROM node:12.18.0

# Set the working directory
WORKDIR /blog

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install the packages
RUN yarn install

# Copy the rest of the code
COPY . .

# Expose port 9000
EXPOSE 9000

# Start the application
CMD [ "yarn", "dev" ]