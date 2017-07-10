<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Deploy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Build and deploy the application';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("DEPLOY APPLICATION\n");
    
        $this->exec('cd .. && bash deploy.sh');
        
        $this->info("DEPLOYED APPLICATION\n");
    }
    
    protected function exec($command)
    {
        $pwd = base_path();
        
        $result = shell_exec("cd $pwd && $command");
        $this->output->write($result);
        return $result;
    }
}
