<!-- components/navbar.php -->
<nav class="navbar navbar-expand-lg navbar-dark custom-navbar mb-4 shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="<?= base_url('/index.php/dashboard') ?>">
            <i class="fas fa-chart-pie"></i> FRISMobile Admin
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="<?= base_url('/index.php/profile') ?>">
                        <i class="fas fa-user-circle"></i> Profile
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= base_url('/index.php/settings') ?>">
                        <i class="fas fa-cog"></i> Settings
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-danger" href="<?= base_url('/index.php/logout') ?>" onclick="return confirm('Are you sure you want to logout?');">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
