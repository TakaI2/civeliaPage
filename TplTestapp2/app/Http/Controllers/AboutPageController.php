<?php
namespace App\Http\Controllers;
use App\Http\Controllers;
class AboutPageController extends Controller{
    public function show(){
        return view('parts/about',[
            "current_time" => date("Y-m-d H:i:s")
        ]);
    }
}