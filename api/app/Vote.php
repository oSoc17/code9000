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
        'observation_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];

    /**
     * Get the observation where the vote belongs to.
     */
    public function observation()
    {
        return $this->belongsTo('App\Observation');
    }

    /**
     * Get the user that did the vote.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    public function skipped()
    {
        return $this->value === 0;
    }
}
