<?php echo $this->extend('layouts/main'); ?>

<?php echo $this->section('content'); ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="fas fa-users text-dark"></i> Reports</h5>
            <div>
                <a href="<?= base_url('dashboard') ?>" class="btn custom-btn ms-2">
                    <i class="fas fa-arrow-left text-light"></i> Back
                </a>
            </div>
        </div>
        <div class="card-body custom-padding">
            <div class="row">
                <div class="col-md-6">
                    <a href="<?php echo base_url('reports/user'); ?>" class="card text-decoration-none shadow-sm p-3">
                        <div class="card-body text-center">
                            <i class="fas fa-users fa-3x text-primary"></i>
                            <h5 class="mt-3">User Report</h5>
                        </div>
                    </a>
                </div>
                <div class="col-md-6">
                    <a href="<?php echo base_url('reports/login'); ?>" class="card text-decoration-none shadow-sm p-3">
                        <div class="card-body text-center">
                            <i class="fas fa-sign-in-alt fa-3x text-success"></i>
                            <h5 class="mt-3">Login Report</h5>
                        </div>
                    </a>
                </div>
            </div>
            <div class="row mt-3" style="margin-top:30px;">
                <div class="col-md-6">
                    <a href="<?php echo base_url('reports/login'); ?>" class="card text-decoration-none shadow-sm p-3">
                        <div class="card-body text-center">
                            <i class="fas fa-bar-chart fa-3x text-success"></i>
                            <h5 class="mt-3">Usage Report</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<?php echo $this->endSection(); ?>
