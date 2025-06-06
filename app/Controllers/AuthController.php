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

    public function testPassword()
    {
        $p = password_hash('admin123', PASSWORD_DEFAULT);
        echo $p."</br>";

        $input = 'admin123'; // Plain text to test

        if (password_verify($input, $p)) {
            return "✅ Password matches.";
        } else {
            return "❌ Password does NOT match.";
        }
    }


    public function authenticate()
    {
        $session = session();
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        try {
            $usersModel = new \App\Models\UsersModel();

            // This line will trigger DB connection
            $user = $usersModel->where('email', $email)->first();

            // Validate user
            if (!$user) {
                $session->setFlashdata('error', 'No user found. Please contact the administrator.');
                return redirect()->to(site_url('login'));
            }

            if (!password_verify($password, $user['password'])) {
                $session->setFlashdata('error', 'Invalid credentials');
                return redirect()->to(site_url('login'));
            }

            if ($user['status'] != 'active') {
                $session->setFlashdata('error', 'Account is inactive.');
                return redirect()->to(site_url('login'));
            }

            // Set session
            $session->set([
                'user_id'    => $user['id'],
                'fullname'   => $user['fullname'],
                'email'      => $user['email'],
                'role_id'    => $user['role_id'],
                'isLoggedIn' => true,
            ]);

            return redirect()->to(site_url('dashboard'));
        } catch (\CodeIgniter\Database\Exceptions\DatabaseException $e) {
            log_message('critical', 'DB Connection Error: ' . $e->getMessage());
            $session->setFlashdata('error', 'Database error occurred. Please try again later.');
            return redirect()->to(site_url('login'));
        } catch (\Throwable $e) {
            log_message('error', 'Unexpected Error: ' . $e->getMessage());
            $session->setFlashdata('error', 'An unexpected error occurred. Please try again.');
            return redirect()->to(site_url('login'));
        }
    }


    public function logout()
    {
        $session = session();
        $session->destroy();
        return redirect()->to(site_url('login'));
    }

    public function checkAccess($requiredRole)
    {
        $userRole = session()->get('role_id');

        if ($userRole !== $requiredRole) {
            return redirect()->to(site_url('unauthorized'));
        }
    }
}
