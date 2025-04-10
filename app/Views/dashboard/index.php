<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="container mt-5">
    <h2 class="text-center">Welcome, <?= isset($fullname) ? $fullname : 'User'; ?>!</h2>
    <p class="text-center">Today's date is <?= date('l, F j, Y'); ?>.</p>

    <div class="row mt-5 text-center">
        <!-- Counter Boxes -->
        <div class="col-md-3 mb-4"> 
            <div class="card shadow-sm h-100 border-0 text-white primary-bg" >
                <div class="card-body">
                    <i class="fas fa-users fa-3x mb-3 text-white"></i>
                    <h5 class="card-title">Total Users</h5>
                    <p class="card-text">1,123,570</p>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-4">
            <div class="card shadow-sm h-100 border-0 text-white primary-bg">
                <div class="card-body">
                    <i class="fas fa-sign-in-alt fa-3x mb-3 text-white"></i>
                    <h5 class="card-title">Logged-in Users</h5>
                    <p class="card-text">0</p>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-4">
            <div class="card shadow-sm h-100 border-0 text-white primary-bg">
                <div class="card-body">
                    <i class="fas fa-user-clock fa-3x mb-3 text-white"></i>
                    <h5 class="card-title">Active This Month</h5>
                    <p class="card-text">0</p>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-4">
            <div class="card shadow-sm h-100 border-0 text-white primary-bg">
                <div class="card-body">
                    <i class="fas fa-user-slash fa-3x mb-3 text-white"></i>
                    <h5 class="card-title">Banned Users</h5>
                    <p class="card-text">0</p>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-5 text-center">
        <div class="col-md-4 mb-4">
            <a href="/shareholders" class="text-decoration-none text-dark">
                <div class="card shadow-sm h-100 border-0 hover-card">
                    <div class="card-body">
                        <i class="fas fa-user-circle fa-3x mb-3 text-primary"></i>
                        <h5 class="card-title">Shareholders</h5>
                        <p class="card-text">Manage Registered Shareholders</p>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-4 mb-4">
            <a href="/users" class="text-decoration-none text-dark">
                <div class="card shadow-sm h-100 border-0 hover-card">
                    <div class="card-body">
                        <i class="fas fa-users-cog fa-3x mb-3 text-success"></i>
                        <h5 class="card-title">Users</h5>
                        <p class="card-text">Manage Administrative Users</p>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-4 mb-4"> 
            <a href="/reports" class="text-decoration-none text-dark">
                <div class="card shadow-sm h-100 border-0 hover-card">
                    <div class="card-body">
                        <i class="fas fa-chart-line fa-3x mb-3 text-primary"></i>
                        <h5 class="card-title">Reports</h5>
                        <p class="card-text">View and Analyze Reports</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

<style>
    .hover-card:hover {
        transform: scale(1.05);
        transition: all 0.3s ease;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
</style>

<?= $this->endSection() ?>
