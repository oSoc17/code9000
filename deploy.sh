#!/usr/bin/env bash

echo $(pwd)

cd api

php artisan down

cd ..
git pull

# Back-end
cd api

rm -rf public/build

composer install

php artisan optimize
php artisan route:cache
php artisan config:cache

cd ..

# Front-end
cd web-app

yarn install
yarn build-css
yarn build

cd ..

# Symlink the front-end to the back-end

CURRENT_DIR=$(pwd)

ln -sf $CURRENT_DIR/web-app/build/**/* $CURRENT_DIR/api/public
ln -sf $CURRENT_DIR/web-app/build/* $CURRENT_DIR/api/public/

# Set live
cd api
php artisan up
