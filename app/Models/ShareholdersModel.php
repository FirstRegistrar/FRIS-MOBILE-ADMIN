<?php

namespace App\Models;

use CodeIgniter\Model;

class ShareholdersModel extends Model
{
    protected $DBGroup       = 'mssql';
    protected $table         = 'T_shold';
    protected $primaryKey    = 'Acctno';
    protected $allowedFields = [
        'Acctno', 'regcode', 'first_nm', 'middle_nm', 'last_nm',
        'addr1', 'addr2', 'addr3', 'phone', 'email'
    ];

    public function searchShareholders($name = '', $email = '', $limit = 10, $offset = 0)
    {
        $builder = $this->builder();

        $builder->select("Acctno, regcode, first_nm, middle_nm, last_nm, phone, email, 
                          CONCAT(addr1, ' ', addr2, ' ', addr3) AS full_address");

        if (!empty($name)) {
            $builder->groupStart()
                    ->like('first_nm', $name)
                    ->orLike('middle_nm', $name)
                    ->orLike('last_nm', $name)
                    ->groupEnd();
        }

        if (!empty($email)) {
            $builder->like('email', $email);
        }

        $builder->where('email IS NOT NULL AND email !=', '');
        $builder->limit($limit, $offset);

        return $builder->get()->getResultArray();
    }

    public function countShareholders($name = '', $email = '')
    {
        $builder = $this->builder();

        if (!empty($name)) {
            $builder->groupStart()
                    ->like('first_nm', $name)
                    ->orLike('middle_nm', $name)
                    ->orLike('last_nm', $name)
                    ->groupEnd();
        }

        if (!empty($email)) {
            $builder->like('email', $email);
        }

        $builder->where('email IS NOT NULL AND email !=', '');

        return $builder->countAllResults();
    }
}
