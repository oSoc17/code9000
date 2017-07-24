<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Leaderboard\Leaderboard;

class LeaderboardController extends Controller
{
    private $leaderboardService;

    public function __construct(Leaderboard $leaderboardService)
    {
        $this->leaderboardService = $leaderboardService;
    }

    public function index()
    {
        return $this->leaderboardService->forAllUsers();
    }
}
