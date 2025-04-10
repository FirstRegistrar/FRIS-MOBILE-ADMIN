<?= $this->extend('layouts/main') ?> 
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="fas fa-users text-dark"></i> Shareholders</h5>
            <div>
                <a href="/dashboard" class="btn custom-btn ms-2">
                    <i class="fas fa-arrow-left text-light"></i> Back
                </a>
            </div>
        </div>
        <div class="card-body custom-padding">
            <div class="row mb-3">
                <div class="col-md-4">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h6 class="card-title">Total Users</h6>
                            <h3 class="card-text" id="totalUsers">0</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h6 class="card-title">Active Users</h6>
                            <h4 id="activeUsers">N/A</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h6 class="card-title">Banned Users</h6>
                            <h4 id="bannedUsers">N/A</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="text-muted mb-0">
                    <i class="fas fa-info-circle"></i> These are the shareholders that have access to FRISMOBILE APP.
                </p>
                <form id="searchForm" class="d-flex" method="GET" action="#">
                    <div id="loader" style="display:none;">
                        <div class="spinner">
                            <div class="double-bounce1"></div>
                            <div class="double-bounce2"></div>
                        </div>
                    </div>
                    <input class="form-control me-2" type="search" name="name" id="nameSearch" placeholder="Search by name" aria-label="Search">
                    <input class="form-control me-2" type="search" name="email" id="emailSearch" placeholder="Search by email" aria-label="Search">
                    <button class="btn custom-btn" type="submit"><i class="fas fa-search text-light"></i></button>
                </form>
            </div>
            <div class="table-responsive" style="max-height: 500px; overflow-y: auto;">
                <table class="table table-hover table-striped align-middle" id="shareholdersTable">
                    <thead>
                        <tr>
                            <th><i class="fas fa-user text-white"></i> Full Name</th>
                            <th><i class="fas fa-map-marker-alt text-white"></i> Address</th>
                            <th><i class="fas fa-envelope text-white"></i> Email</th>
                            <th><i class="fas fa-cog text-white"></i></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="mt-3 d-flex justify-content-between align-items-center" id="paginationContainer">
                <span id="totalRecords" class="text-muted"></span>
            </div>
        </div>
    </div>
</div>

<script>
    var baseUrl = "<?= base_url(); ?>";
</script>
<script src="<?= base_url('assets/js/shareholders/index.js') ?>"></script>
<?= $this->endSection() ?>
