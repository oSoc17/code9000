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

        abort_unless($ref === $request->ref, 403);

        $response = Artisan::call('deploy');

        return response(['success' => true]);
    }
}
