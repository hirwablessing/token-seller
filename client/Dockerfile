FROM node:16-alpine
#specifying the working directory
WORKDIR /usr/app

#copy package.json to the working directory
COPY ./package.json .

# Install dependencies
RUN npm install

# Copy application source code to the working directory
COPY . .

# Expose the app port
EXPOSE 4000


# Create build output directory
RUN npm run build 

CMD [ "npm","run", "preview" ]