<?= $this->extend('layouts/main') ?> 
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="fas fa-user-shield" style="color: #113f6d;"></i> Roles Management</h5>
            <div>
                <a href="<?= site_url('roles/create') ?>" class="btn custom-btn">
                    <i class="fas fa-plus text-light"></i> Add New Role
                </a>
                <a href="<?= site_url('dashboard') ?>" class="btn custom-btn">
                    <i class="fas fa-arrow-left text-light"></i> Back
                </a>
            </div>
        </div>
        <div class="card-body custom-padding">
            <?php if (session()->getFlashdata('success')): ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <?= session()->getFlashdata('success') ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php endif; ?>

            <?php if (session()->getFlashdata('error')): ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <?= session()->getFlashdata('error') ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php endif; ?>

            <div class="table-responsive">
                <table class="table table-bordered table-hover text-center">
                    <thead style="background-color: #113f6d; color: white;">
                        <tr>
                            <th>#</th>
                            <th>Role Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($roles as $index => $role): ?>
                            <tr>
                                <td><?= $index + 1 ?></td>
                                <td><?= esc($role['name']) ?></td>
                                <td><?= esc($role['description']) ?></td>
                                <td>
                                    <a href="<?= site_url('roles/edit/'.$role['id']) ?>" class="btn btn-warning btn-sm mx-1 text-dark">
                                        <i class="fas fa-edit text-dark"></i>
                                    </a>
                                    <a href="<?= site_url('roles/delete/'.$role['id']) ?>" class="btn btn-danger btn-sm mx-1 text-light" onclick="return confirm('Are you sure you want to delete this role?');">
                                        <i class="fas fa-trash-alt text-light"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?= $this->endSection() ?>
