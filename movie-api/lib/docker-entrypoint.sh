#!/bin/sh
set -e

if [ -f /app/tmp/pids/server.pid ]; then
  rm /app/tmp/pids/server.pid
fi

rails db:migrate 2>/dev/null || bundle exec rake db:setup
rails db:seed
rails s -b 0.0.0.0 -p 80
