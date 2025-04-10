<?php

namespace App\Controllers;

use App\Models\UsersModel;
use App\Models\RolesModel;
use CodeIgniter\Exceptions\PageNotFoundException;

class UsersController extends BaseController
{
    protected $usersModel;
    protected $rolesModel;

    public function __construct()
    {
        $this->usersModel = new UsersModel();
        $this->rolesModel = new RolesModel();
    }

    public function index()
    {
        $users = $this->usersModel->select('users.*, roles.name as role_name')
            ->join('roles', 'users.role_id = roles.id', 'left')
            ->findAll();

        // Counters
        $totalUsers = count($users);
        $totalSuperAdmins = count(array_filter($users, fn($u) => $u['role_id'] === '1'));
        $totalAdmins = count(array_filter($users, fn($u) => $u['role_id'] === '2'));

        return view('users/index', [
            'users' => $users,
            'totalUsers' => $totalUsers,
            'totalAdmins' => $totalAdmins,
            'totalSuperAdmins' => $totalSuperAdmins
        ]);
    }


    public function create()
    {
        $roles = $this->rolesModel->findAll();
        return view('users/create', ['roles' => $roles]);
    }

    public function store()
    {
        $email = $this->request->getPost('email');

        // Check if email already exists
        if ($this->usersModel->where('email', $email)->first()) {
            return redirect()->back()->withInput()->with('error', 'Email already exists.');
        }

        $data = [
            'fullname' => $this->request->getPost('fullname'),
            'email' => $email,
            'password' => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
            'role_id' => $this->request->getPost('role_id')
        ];

        $this->usersModel->save($data);

        return redirect()->to('/users')->with('success', 'User created successfully.');
    }

    public function edit($id)
    {
        $user = $this->usersModel->find($id);
        $roles = $this->rolesModel->findAll();

        if (!$user) {
            throw PageNotFoundException::forPageNotFound();
        }

        return view('users/edit', ['user' => $user, 'roles' => $roles]);
    }

    public function update($id)
    {
        $data = [
            'fullname' => $this->request->getPost('fullname'),
            'email' => $this->request->getPost('email'),
            'role_id' => $this->request->getPost('role_id')
        ];

        // Update password only if provided
        if ($this->request->getPost('password')) {
            $data['password'] = password_hash($this->request->getPost('password'), PASSWORD_DEFAULT);
        }

        $this->usersModel->update($id, $data);

        return redirect()->to('/users')->with('success', 'User updated successfully.');
    }

    public function delete($id)
    {
        $this->usersModel->delete($id);
        return redirect()->to('/users')->with('success', 'User deleted successfully.');
    }
}
