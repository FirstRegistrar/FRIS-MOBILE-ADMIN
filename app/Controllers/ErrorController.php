<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class ErrorController extends Controller
{
    public function unauthorized()
    {
        return view('errors/unauthorized');
    }
}
