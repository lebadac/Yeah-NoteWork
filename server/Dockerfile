FROM node:14

WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép tất cả các tệp còn lại vào container
COPY . .

# Mở cổng cho ứng dụng
EXPOSE 2001

# Lệnh khởi động ứng dụng
CMD ["node", "index.js"]
