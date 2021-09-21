FROM daominah/nodejs12

COPY package.json /
COPY package-lock.json /
RUN cd / && npm install

ENV APP_DIR=/javascript/src/app
WORKDIR ${APP_DIR}
RUN mkdir -p ./node_modules
RUN cp -a /node_modules ${APP_DIR}
COPY . ${APP_DIR}
RUN ln ${APP_DIR}/docker-entrypoint.sh /docker-entrypoint.sh

ENV SERVE_LISTEN=5000
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["bash", "-c", "node /usr/bin/npx serve -s -n -l ${SERVE_LISTEN} build"]
