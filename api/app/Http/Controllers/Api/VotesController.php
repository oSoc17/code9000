<?php

namespace App\Http\Controllers\Api;

use App\Vote;
use App\Observation;
use App\Events\ObservationIsValid;
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
        $observation = $this->getObservation($request->observation_id);
        $currentVote = $this->findCurrentVote($observation);

        if (! is_null($currentVote)) {
            return response()->json('You have already voted on this observation.');
        }

        // Store vote
        $vote = new Vote($request->all());
        $vote->user_id = auth()->user()->id;
        $vote->save();

        // Check threshold to (un)validate observation
        $this->checkObservationThreshold($observation);

        return $vote;
    }

    private function getObservation($id)
    {
        return Observation::whereNull('is_valid')
            ->where('observation_id', $request->observation_id)
            ->firstOrFail();
    }

    private function findCurrentVote(Observation $observation)
    {
        return Vote::where('observation_id', $observation->id)
            ->where('user_id', auth()->user()->id);
    }

    private function checkObservationThreshold(Observation $observation)
    {
        $sum = $observation->votes->reduce(function ($carry, $item) {
            return $carry + $item;
        });

        if ($sum >= config('app.valid_observation_threshold')) {
            $observation->is_valid = true;
            $observation->save();

            event(new ObservationIsValid($observation));
        }

        if ($sum <= config('app.unvalid_observation_threshold')) {
            $observation->is_valid = false;
            $observation->save();
        }
    }
}
