<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'captured_at', 'longitude', 'latitude', 'picture_storage',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'picture_storage', 'created_at', 'updated_at',
    ];

    /**
     * Get the votes for the current observation.
     */
    public function votes()
    {
        return $this->hasMany('App\Vote');
    }

    public function isValid()
    {
        return $this->is_valid === 1;
    }
}
