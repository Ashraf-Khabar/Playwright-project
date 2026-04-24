FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /e2e-tests

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    git \
    curl \
    && curl -L https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -o /usr/bin/yq \
    && chmod +x /usr/bin/yq

RUN npm install

COPY . .

EXPOSE 9323

ENTRYPOINT ["npx", "playwright", "test", "tests/", "--trace", "on"]