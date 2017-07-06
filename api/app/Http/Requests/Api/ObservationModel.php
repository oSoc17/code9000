<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ObservationModel extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // TODO: in a later stage, only IoT devices can do this.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'image'       => 'required|image|mimes:jpeg',
            'longitude'   => 'required',
            'latitude'    => 'required',
            'captured_at' => 'required|date',
        ];
    }
}
