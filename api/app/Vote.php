<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'value',
    ];

    /**
     * Get the observation where the vote belongs to. 
     */
    public function observation()
    {
     	return $this->belongsTo('App\Observation');
    }

    /**
     * Get the user that did the vote
     */
    public function user()
    {
    	return $this->belongsTo('App\User');
    }
}
