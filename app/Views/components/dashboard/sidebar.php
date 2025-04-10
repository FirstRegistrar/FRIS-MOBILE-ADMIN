<nav class="sidebar">
    <div class="mt-4">
        <div class="card shadow-lg border-0">
            <div class="card-body custom-padding">
                <ul class="list-unstyled">
                    <li class="<?= (uri_string() == 'dashboard') ? 'active' : '' ?>">
                        <a href="<?= base_url('dashboard') ?>">
                            <i class="fa-solid fa-home" style="color:#FFF"></i> Dashboard
                        </a>
                    </li>
                    <li class="<?= (uri_string() == 'shareholders') ? 'active' : '' ?>">
                        <a href="<?= base_url('shareholders') ?>">
                            <i class="fa-solid fa-users" style="color:#FFF"></i> Shareholders
                        </a>
                    </li>
                    <li class="<?= (uri_string() == 'reports') ? 'active' : '' ?>">
                        <a href="<?= base_url('reports') ?>">
                            <i class="fa-solid fa-chart-line" style="color:#FFF"></i> Reports
                        </a>
                    </li>
                </ul>
            </div>
        </div>            
    </div>
</nav>
