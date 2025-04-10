<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class ReportsController extends BaseController
{
    public function index()
    {
        return view('reports/index');
    }

    public function users()
    {
        // Load the view without hitting the database
        return view('reports/users');
    }

    public function getData()
    {
        // Only allow AJAX requests
        if (!$this->request->isAJAX()) {
            throw new \CodeIgniter\Exceptions\PageNotFoundException('No direct script access allowed.');
        }

        $model = new ShareholdersModel();
        $pager = \Config\Services::pager();

        $perPage = 10;
        $page = (int) ($this->request->getVar('page') ?? 1);
        $offset = ($page - 1) * $perPage;
        $searchTerm = $this->request->getGet('search');

        $shareholders = $model->searchShareholders($searchTerm, $perPage, $offset);
        $totalUsers = $model->countShareholders($searchTerm);
        $pagination = $pager->makeLinks($page, $perPage, $totalUsers);

        $tableHTML = view('reports/user', ['shareholders' => $shareholders]);
        return $this->response->setJSON([
            'table'      => $tableHTML,
            'pagination' => $pagination,
            'totalUsers' => $totalUsers
        ]);
    }
}

?>
