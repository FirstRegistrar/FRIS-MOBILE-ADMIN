<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\ShareholdersModel;

class ViewActivityController extends BaseController
{
    public function index()
    {
        $acctno = $this->request->getGet('shareholder');
        $email = $this->request->getGet('email');

        if (!$acctno) {
            return redirect()->to('/shareholders')->with('error', 'No shareholder selected.');
        }

        $model = new ShareholdersModel();
        $db = \Config\Database::connect('mssql'); // Explicitly use MSSQL

        // Fetch shareholder details
        $shareholder = $model->where('Acctno', $acctno)->where('email', $email)->first();

        if (!$shareholder) {
            return redirect()->to('/shareholders')->with('error', 'Shareholder not found.');
        }

        $query = $db->query("
            SELECT DISTINCT CL.Name AS company_name
            FROM [dbo].[T_shold] TS
            INNER JOIN [dbo].[___OnlineRegs] CL 
                ON TS.regcode = CL.Id
            WHERE TS.Acctno = ? AND TS.email = ?", [$acctno,$email]);

        $companies = $query->getResultArray();

        return view('view_activity/index', [
            'shareholder' => $shareholder,
            'companies'   => $companies
        ]);

    }
}
