<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UsersModel;

class SettingsController extends BaseController
{
    public function index()
    {
        $userModel = new UsersModel();
        $user = $userModel->find(session()->get('user_id'));
        return view('settings/index', ['user' => $user]);
    }

    public function update()
    {
        $userModel = new UsersModel();
        $userId = session()->get('user_id');

        $data = [
            'dark_mode' => $this->request->getPost('dark_mode') ? 1 : 0,
            'email_notifications' => $this->request->getPost('email_notifications') ? 1 : 0,
        ];

        $userModel->update($userId, $data);
        session()->setFlashdata('success', 'Settings updated successfully.');
        return redirect()->to('/settings');
    }
}
