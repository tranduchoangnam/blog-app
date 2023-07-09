# Base image
FROM node:18

# Make folder to put our files in
RUN mkdir /app


ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# Set working directory so that all subsequent commands run in this folder
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client code


# Copy the rest of the app
COPY . .

# Expose port to access the server
EXPOSE 8000

# Command to run our app
CMD ["npm", "deploy"]
