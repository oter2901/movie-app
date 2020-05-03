FROM ruby:2.6.1-alpine
LABEL Mantainer="Oswaldo Tedesco oter2901@gmail.com"
WORKDIR /usr/src/app
RUN apk add --no-cache --update \
    build-base \
    linux-headers \
    postgresql-dev \
    tzdata

COPY ./Gemfile* ./
RUN bundle install
COPY . .
ENTRYPOINT ["./lib/docker-entrypoint.sh"]