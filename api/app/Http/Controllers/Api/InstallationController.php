<?php

namespace App\Http\Controllers\Api;

use App\Installation;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\InstallationModel;

class InstallationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Installation::orderBy('active', 'DESC')
            ->orderBy('updated_at', 'DESC')
            ->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InstallationModel $request, $id)
    {
        $installation = Installation::find($id);

        $installation->fill($request->all());
        $installation->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $installation = Installation::find($id);

        $installation->delete();
    }
}
