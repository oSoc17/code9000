<?php

namespace App\Services\Leaderboard;

use App\User;
use App\Vote;

class Leaderboard {
    
    const CORRECT = 10;
    const WRONG = -10;
    
    const SKIP = 0;
    const VOTE = 1;
    
    public function forAllUsers()
    {
        $users = User::with('votes.observation')->get();
        
        $usersWithPoints = $users->map(function ($user)
        {
            $user->points = $this->forUser($user);
            
            return collect($user->toArray())->only(['name', 'points']);
        });
        
        return $usersWithPoints->sortByDesc('points')->values()->all();
    }
    
    public function forUser(User $user)
    {
        return $user->votes->reduce(function ($acc, $vote)
        {
            // If the observation has been skipped, no points can be won or lost.
            if ($vote->skipped()) {
                return $acc + self::SKIP;
            }
            
            // Every vote that hasn't been skipped gets one point
            $points = self::VOTE;
            
            // If the observation have not been rated, just return the self::VOTE point.
            if (is_null($vote->observation->is_valid))
            {
                return $acc + $points;
            }
            
            return $acc + self::VOTE + ($this->correctVoted($vote) ? self::CORRECT : self::WRONG);
        }, 0);
    }
    
    private function correctVoted(Vote $vote)
    {
        if ($vote->value === 1 && $vote->observation->is_valid === 1)
        {
            return true;
        }
    
        if ($vote->value === -1 && $vote->observation->is_valid === 0)
        {
            return true;
        }
        
        return false;
    }
    
}