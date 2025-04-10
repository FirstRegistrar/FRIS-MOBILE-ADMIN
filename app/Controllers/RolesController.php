<?php

namespace App\Controllers;

use App\Models\RolesModel;
use App\Models\PermissionsModel;
use CodeIgniter\Exceptions\PageNotFoundException;

class RolesController extends BaseController
{
    protected $rolesModel;
    protected $permissionsModel;

    public function __construct()
    {
        $this->rolesModel = new RolesModel();
        $this->permissionsModel = new PermissionsModel();
    }

    public function index()
    {
        $roles = $this->rolesModel->findAll();
        return view('roles/index', ['roles' => $roles]);
    }

    public function create()
    {
        $permissions = $this->permissionsModel->findAll();
        return view('roles/create', ['permissions' => $permissions]);
    }

    public function store()
    {
        $data = [
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'permissions' => json_encode($this->request->getPost('permissions'))
        ];

        $this->rolesModel->save($data);

        return redirect()->to('/roles')->with('success', 'Role created successfully.');
    }

    public function edit($id)
    {
        $role = $this->rolesModel->find($id);
    
        if (!$role) {
            throw PageNotFoundException::forPageNotFound();
        }
    
        $permissions = $this->permissionsModel->findAll();
        $rolePermissions = isset($role['permissions']) ? json_decode($role['permissions']) : [];
    
        return view('roles/edit', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions
        ]);
    }
    

    public function update($id)
    {
        $data = [
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'permissions' => json_encode($this->request->getPost('permissions'))
        ];

        $this->rolesModel->update($id, $data);

        return redirect()->to('/roles')->with('success', 'Role updated successfully.');
    }

    public function delete($id)
    {
        $this->rolesModel->delete($id);
        return redirect()->to('/roles')->with('success', 'Role deleted successfully.');
    }
}
