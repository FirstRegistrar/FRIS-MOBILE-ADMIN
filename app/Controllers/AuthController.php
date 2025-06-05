<?php

namespace App\Controllers;

use App\Models\UsersModel;
use CodeIgniter\Controller;

class AuthController extends Controller
{
    public function login()
    {
        return view('auth/login');
    }

    public function authenticate()
    {
        file_put_contents(WRITEPATH . 'logs/auth-debug.log', "HIT: " . json_encode($_POST));
        die('AUTH METHOD REACHED');
    }

    public function logout()
    {
        $session = session();
        $session->destroy();
        return redirect()->to('/login');
    }

    public function checkAccess($requiredRole)
    {
        $userRole = session()->get('role_id');

        if ($userRole !== $requiredRole) {
            return redirect()->to('/unauthorized');
        }
    }
        
}
