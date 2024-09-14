# Use Node.js 18.17.0 or higher
FROM node:18.17.0

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Run the Next.js development server
CMD ["npm", "run", "dev"]
