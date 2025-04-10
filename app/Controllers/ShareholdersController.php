<?php

namespace App\Controllers;

use App\Models\ShareholdersModel;
use CodeIgniter\Controller;
use CodeIgniter\Pager\Pager;

class ShareholdersController extends BaseController
{
    public function index()
    {
        return view('shareholders/index');
    }

    public function getData()
    {
        if (!$this->request->isAJAX()) {
            throw new \CodeIgniter\Exceptions\PageNotFoundException('No direct script access allowed.');
        }

        $model = new ShareholdersModel();
        $pager = \Config\Services::pager();

        $perPage = 10;
        $page = (int) ($this->request->getVar('page') ?? 1);
        $offset = ($page - 1) * $perPage;

        $name = $this->request->getGet('name');
        $email = $this->request->getGet('email');

        $shareholders = $model->searchShareholders($name, $email, $perPage, $offset);
        $totalUsers = $model->countShareholders($name, $email);
        $pagination = $pager->makeLinks($page, $perPage, $totalUsers);

        $tableHTML = view('shareholders/table_rows', ['shareholders' => $shareholders]);
        return $this->response->setJSON([
            'table'      => $tableHTML,
            'pagination' => $pagination,
            'totalUsers' => $totalUsers
        ]);
    }
}
