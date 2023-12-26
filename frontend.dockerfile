# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
FROM node:alpine3.11

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .

# Install node packages
RUN npm install

# Build the app
RUN npm run build

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE $PORT


# Start the app
CMD [ "npm", "start" ]