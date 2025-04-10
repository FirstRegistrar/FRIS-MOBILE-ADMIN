<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="card shadow-lg border-o">
    
<div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
    <h5 class="mb-0"><i class="fas fa-users text-dark"></i> Admin Users</h5>
    <div>
        <a href="/users/create" class="btn custom-btn">
            <i class="fas fa-user-plus text-light"></i> <span>Create New User</span>
        </a>
        <a href="/dashboard" class="btn custom-btn ms-2">
            <i class="fas fa-arrow-left text-light"></i> Back
        </a>
    </div>
</div>

    <div class="card-body">


<!-- Counter Boxes --> 
<div class="row mb-3">
    <div class="col-md-4">
        <div class="card text-white" style="background-color: #777; border-radius: 0; padding: 10px;">
            <div class="card-body text-center p-2">
                <h6 class="card-title mb-1" style="font-size: 0.85em;">
                    <i class="fas fa-users me-1 text-light" style="font-size: 1em; vertical-align: middle;"></i> Total Users
                </h6>
                <h4 style="font-size: 1.2em; margin: 0;"><?= $totalUsers ?></h4>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card text-white" style="background-color: #777; border-radius: 0; padding: 10px;">
            <div class="card-body text-center p-2">
                <h6 class="card-title mb-1" style="font-size: 0.85em;">
                    <i class="fas fa-user-shield me-1 text-light" style="font-size: 1em; vertical-align: middle;"></i> Admin
                </h6>
                <h4 style="font-size: 1.2em; margin: 0;"><?= $totalSuperAdmins ?></h4>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card text-white" style="background-color: #777; border-radius: 0; padding: 10px;">
            <div class="card-body text-center p-2">
                <h6 class="card-title mb-1" style="font-size: 0.85em;">
                    <i class="fas fa-user-tag me-1 text-light" style="font-size: 1em; vertical-align: middle;"></i> Sub-Admin
                </h6>
                <h4 style="font-size: 1.2em; margin: 0;"><?= $totalAdmins ?></h4>
            </div>
        </div>
    </div>
</div>



        <?php if (session()->getFlashdata('success')) : ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle"></i> <?= session()->getFlashdata('success') ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <div class="table-responsive">
    <table class="table table-hover table-striped align-middle">
        <thead>
            <tr>
                <th><i class="fas fa-hashtag text-white"></i> ID</th>
                <th><i class="fas fa-user text-white"></i> Full Name</th>
                <th><i class="fas fa-envelope text-white"></i> Email</th>
                <th><i class="fas fa-user-tag text-white"></i> Role</th>
                <th class="text-center"><i class="fas fa-cogs"></i> Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user) : ?>
                <tr>
                    <td><?= $user['id'] ?></td>
                    <td><?= $user['fullname'] ?></td>
                    <td><?= $user['email'] ?></td>
                    <td>
                        <span class="badge bg-info">
                            <i class="fas fa-user-shield"></i> <?= $user['role_name'] ?>
                        </span>
                    </td>
                    <td class="text-center">
                        <a href="/users/edit/<?= $user['id'] ?>" class="btn btn-outline-warning btn-sm mx-1" title="Edit">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="/users/delete/<?= $user['id'] ?>" class="btn btn-outline-danger btn-sm mx-1" title="Delete" onclick="return confirm('Are you sure?')">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
    </div>
</div>

<?= $this->endSection() ?>
