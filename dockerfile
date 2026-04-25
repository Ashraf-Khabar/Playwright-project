ARG playwright_version=v1.59.1  
ARG playwright_port=9323

FROM mcr.microsoft.com/playwright:${playwright_version}-noble

WORKDIR /e2e-tests

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    git \
    curl \
    && curl -L https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -o /usr/bin/yq \
    && chmod +x /usr/bin/yq

RUN npm install

COPY . .

EXPOSE ${playwright_port}

ENTRYPOINT ["./run_tests.sh"]