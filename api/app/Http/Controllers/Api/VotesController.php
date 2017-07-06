<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\VoteModel;
use App\Vote;

class VotesController extends Controller
{
    public function store(VoteModel $request)
    {
        $currentVote = Vote::where(['observation_id' => $request->observation_id, 'user_id' => auth()->user()->id])->first();

        if (!is_null($currentVote)) {
            return response()->json('You has already voted');
        }

        $vote = new Vote($request->all());
        $vote->user_id = auth()->user()->id;
        $vote->save();

        return $vote;
    }
}
