FROM httpd:2.4.33-alpine

RUN apk update; \
    apk upgrade;

COPY demo.apache.conf /usr/local/apache2/conf/demo.apache.conf

RUN echo "Include /usr/local/apache2/conf/demo.apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf

COPY ./static /var/www/html

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
