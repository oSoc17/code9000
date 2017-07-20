<?php

namespace App\Http\Controllers\Api;

use App\Services\Leaderboard\Leaderboard;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LeaderboardController extends Controller {
    
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
