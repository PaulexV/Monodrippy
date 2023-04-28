FROM mongo:latest



COPY ./restore.sh /docker-entrypoint-initdb.d/restore.sh

RUN chmod +x /docker-entrypoint-initdb.d/restore.sh

CMD ["mongod"]