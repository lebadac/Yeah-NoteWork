FROM nginx:alpine

# Sao chép tất cả các tệp từ thư mục client vào thư mục html của nginx
COPY . /usr/share/nginx/html

# Expose port 80 để có thể truy cập ứng dụng qua trình duyệt
EXPOSE 80

COPY favicon.ico /usr/share/nginx/html/