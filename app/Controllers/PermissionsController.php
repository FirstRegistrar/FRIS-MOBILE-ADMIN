<?php

namespace App\Controllers;

use App\Models\PermissionsModel;
use CodeIgniter\Exceptions\PageNotFoundException;

class PermissionsController extends BaseController
{
    protected $permissionsModel;

    public function __construct()
    {
        $this->permissionsModel = new PermissionsModel();
    }

    public function index()
    {
        $permissions = $this->permissionsModel->findAll();
        return view('permissions/index', ['permissions' => $permissions]);
    }

    public function create()
    {
        return view('permissions/create');
    }

    public function store()
    {
        $data = [
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description')
        ];

        $this->permissionsModel->save($data);

        return redirect()->to('/permissions')->with('success', 'Permission created successfully.');
    }

    public function edit($id)
    {
        $permission = $this->permissionsModel->find($id);

        if (!$permission) {
            throw PageNotFoundException::forPageNotFound();
        }

        return view('permissions/edit', ['permission' => $permission]);
    }

    public function update($id)
    {
        $data = [
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description')
        ];

        $this->permissionsModel->update($id, $data);

        return redirect()->to('/permissions')->with('success', 'Permission updated successfully.');
    }

    public function delete($id)
    {
        $this->permissionsModel->delete($id);
        return redirect()->to('/permissions')->with('success', 'Permission deleted successfully.');
    }
}
