<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UsersModel;

class ProfileController extends BaseController
{
    public function edit()
    {
        $userModel = new UsersModel();
        $user = $userModel->find(session()->get('user_id'));
        return view('profile/edit', ['user' => $user]);
    }

    public function update()
    {
        $userModel = new UsersModel();
        $userId = session()->get('user_id');

        $data = [
            'fullname' => $this->request->getPost('fullname'),
            'email' => $this->request->getPost('email')
        ];

        $password = $this->request->getPost('password');
        if (!empty($password)) {
            $data['password'] = password_hash($password, PASSWORD_DEFAULT);
        }

        $userModel->update($userId, $data);
        session()->setFlashdata('success', 'Profile updated successfully.');
        return redirect()->to('/profile/edit');
    }
}
