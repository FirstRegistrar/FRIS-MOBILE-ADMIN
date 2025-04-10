<?php

namespace App\Controllers;

class DashboardController extends BaseController
{
    public function index()
    {
        $session = session();
        $data['fullname'] = $session->get('fullname'); // Replace with dynamic data from session or database
        return view('dashboard/index', $data);
    }
}
