<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Installation extends Model
{
    protected $fillable = [
        'active',
        'token',
    ];
}
