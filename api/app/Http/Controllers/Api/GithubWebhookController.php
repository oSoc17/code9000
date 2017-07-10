<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;

class GithubWebhookController extends Controller
{
    public function deploy(Request $request)
    {
        $ref = sprintf('refs/heads/%s', config('app.deploy_branch_webhook'));
    
        $payload = json_decode($request->payload);
            
        abort_unless($ref === $payload->ref, 403);

        $response = Artisan::call('deploy');

        return response(['success' => true]);
    }
}
