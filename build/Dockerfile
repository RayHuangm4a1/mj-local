FROM 343270126633.dkr.ecr.ap-northeast-2.amazonaws.com/ljit/pm2:10.16.2-alpine-kafka

ARG PHASE

WORKDIR /src

COPY . .

ADD ./config/config.${PHASE}.json ./config/config.json

RUN npm config set @types:registry https://registry.npmjs.org/ && \
	npm config set @babel:registry https://registry.npmjs.org/ && \
	npm config set @jest:registry https://registry.npmjs.org/ && \
	npm config set @cnakazawa:registry https://registry.npmjs.org/ && \
	npm config set @ant-design:registry=https://registry.npmjs.org/ && \
	npm config set @webassemblyjs:registry=https://registry.npmjs.org/ && \
	npm config set @xtuc:registry=https://registry.npmjs.org/ && \
	npm config set @hapi:registry=https://registry.npmjs.org/ && \
	npm config set @onsenui:registry=https://registry.npmjs.org/ && \
	npm install --registry=http://npm.ljit.io/ && \
	npm test && \
	pm2 set pm2-logrotate:max_size 1G && \
	pm2 set pm2-logrotate:retain 10
