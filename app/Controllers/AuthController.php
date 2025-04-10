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
        $session = session();
        $usersModel = new UsersModel();
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');
        
        // Check if users exist in the database
        $user = $usersModel->where('email', $email)->first();
        if (!$user) {
            $session->setFlashdata('error', 'No user found. Please contact the administrator.');
            return redirect()->to('/login');
        }

        // Verify password
        if (!password_verify($password, $user['password'])) {
            $session->setFlashdata('error', 'Invalid credentials');
            return redirect()->to('/login');
        }

        // Check user status
        if ($user['status'] != 'active') {
            $session->setFlashdata('error', 'Account is inactive. Please contact the administrator.');
            return redirect()->to('/login');
        }

        // Set session data
        $sessionData = [
            'user_id'   => $user['id'],
            'fullname'  => $user['fullname'],
            'email'     => $user['email'],
            'role_id'   => $user['role_id'],
            'isLoggedIn' => true,
        ];
        $session->set($sessionData);

        return redirect()->to('/dashboard');
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
