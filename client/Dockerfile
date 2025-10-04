FROM node:18 as build

WORKDIR /app

# copy only package.json files first
COPY package*.json ./
RUN npm install

# copy the rest of the app
COPY . .

RUN npm run build

# serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
