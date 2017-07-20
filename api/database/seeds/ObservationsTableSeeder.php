<?php

use Carbon\Carbon;
use App\Observation;
use Illuminate\Http\File;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ObservationsTableSeeder extends Seeder
{
    private $images = [
        'flamingo.jpg',
        'common-tern1.jpg',
        'duck.jpg',
        'common-tern2.jpg',
        'pigeon.jpg',
        'common-tern3.jpg',
        'ostrich.jpg',
        'common-tern4.jpg',
        'penguin.jpg',
        'common-tern5.jpg',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->images as $image) {
            $this->createImage($image);
        }
    }

    private function createImage($image)
    {
        $imageLocation = storage_path('example/observations').'/'.$image;

        Observation::create([
            'captured_at'  => Carbon::now(),
            'longitude'    => '4.3517000',
            'latitude'     => '50.8503000',
            'picture_storage' => Storage::putFile('observations', new File($imageLocation)),
        ]);
    }
}
