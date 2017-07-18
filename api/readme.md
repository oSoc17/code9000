The API
===================
----------

Getting Started
-------------
----------
####  Requirements

 - php  (^7.x.x)
 - composer  (^v1.4.2)
 - mysql (or other database)

####  Installation

To run the API locally, you'll need to install the dependencies using composer.

```
$  composer install
```
When everything is installed, the environment variables need to be declared. Copy your .env.example to .env and fill in your settings.

```
$  cp .env.example .env
```

Now comes the php part. First generate your application key and add it to your .env. This assures the data and user sessions are encrypted. Then make, migrate and seed your database, run:
```
$ php artisan key:generate
$ php artisan migrate
$ php artisan db:seed
```

Your local API is finished. There are multiple ways to run it eg. a virtualhost. To setup a localhost, run:

```
$  php artisan serve
```
