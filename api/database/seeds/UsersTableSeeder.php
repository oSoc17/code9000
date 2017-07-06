<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->seedDevelopLogin();
    }

    /**
     * Add one account for developpers
     */
    private function seedDevelopLogin()
    {
    	$this->createUser('develop', 'develop@bird.today', 'bird');
    }

	/**
	 * Create User with name, email and password
	 */
	private function createUser($name, $email, $password)
	{
		$account = [
    		'name' => $name,
    		'email' => $email, 
    		'password' => bcrypt($password)
    	];
	 	User::create($account);
	}
}
