#!/bin/sh
# Ensure Laravel public/storage is linked so uploaded images are served at /storage/*
set -e
API_ROOT="/fleetbase/api"
if [ ! -f "$API_ROOT/artisan" ]; then
  API_ROOT="/var/www/html"
fi
cd "$API_ROOT" || true

mkdir -p storage/app/public/uploads/system \
  storage/app/public/uploads/images \
  storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs 2>/dev/null || true

# Prefer a real bind-mounted directory; otherwise create the artisan symlink.
if [ -L public/storage ]; then
  :
elif [ -d public/storage ]; then
  :
elif [ -f artisan ]; then
  php artisan storage:link 2>/dev/null || \
    ln -sfn "$API_ROOT/storage/app/public" public/storage 2>/dev/null || true
fi

# Readable by the web server even when files were written as root
chmod -R a+rX storage/app/public 2>/dev/null || true
chmod -R ug+rwX storage/app/public/uploads 2>/dev/null || true

exec "$@"
