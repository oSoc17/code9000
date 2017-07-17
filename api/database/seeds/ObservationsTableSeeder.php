<?php

use App\Observation;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class ObservationsTableSeeder extends Seeder {
    
    private $images = [
        'bird1.jpg',
        'bird2.jpg',
        'bird3.jpg',
    ];
    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->images as $image) {
            $this->createImage($image);
        }
    }
    
    private function createImage($image)
    {
        $imageLocation = storage_path('example/observations') . '/' . $image;
        
        Observation::create([
            'captured_at'  => Carbon::now(),
            'longitude'    => '4.3517000',
            'latitude'     => '50.8503000',
            'picture_storage' => Storage::putFile('observations', new File($imageLocation)),
        ]);
    }
}
