# Use the official Node.js image as the base  
FROM node:14  

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm install  

# Backend
FROM python:3.13.2

WORKDIR /app_demo

# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 

# Copy the Django project  and install dependencies
COPY ./core-api/requirements.txt ./core-api/requirements.txt

# run this command to install all dependencies 
RUN python3 -m pip install -r ./core-api/requirements.txt

# Copy the app source code to the container  
COPY . .  

# Build the Next.js app  
RUN npm run build  

# Expose the port the app will run on  
EXPOSE 3000  

# Start the app  
CMD ["npm", "start"]  