<?php

namespace App\Http\Controllers\Api;

use App\Vote;
use App\Observation;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\VoteModel;

class VotesController extends Controller
{
    /**
     * Add a new vote for specific user. Only unique votes.
     *
     * @param \App\Http\Requests\Api\VoteModel $request
     *
     * @return \App\Vote|\Illuminate\Http\JsonResponse
     */
    public function store(VoteModel $request)
    {
        $currentVote = Vote::where(['observation_id' => $request->observation_id, 'user_id' => auth()->user()->id])->first();

        if (! is_null($currentVote)) {
            return response()->json('You have already voted');
        }

        $vote = new Vote($request->all());
        $vote->user_id = auth()->user()->id;
        $vote->save();

        $this->checkObservationThreshold(Observation::find($request->observation_id));

        return $vote;
    }

    private function checkObservationThreshold(Observation $observation)
    {
        $sum = 0;
        foreach ($observation->votes as $vote) {
            $sum += $vote->value;
        }
        if ($sum >= config('app.valid_observation_threshold')) {
           $observation->is_valid = true;
           $observation->save();
        }
    }
}
