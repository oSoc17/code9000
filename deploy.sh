#!/usr/bin/env bash

cd api

php artisan down

eval `ssh-agent -s`

ssh-add -D
ssh-add ~/.ssh/id_rsa

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
yarn build

ln -s /home/birds/develop/web-app/build /home/birds/develop/api/public

cd ..

# Set live
cd api
php artisan up