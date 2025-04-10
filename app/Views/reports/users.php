<?= $this->extend('layouts/main') ?> 
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="fas fa-users text-dark"></i> Shareholders Report</h5>
            <div>
                <a href="/dashboard" class="btn custom-btn ms-2">
                    <i class="fas fa-arrow-left text-light"></i> Back
                </a>
                <a href="#" class="btn custom-btn ms-2">
                    <i class="fas fa-print text-light"></i> Print
                </a>
                <a href="#" class="btn custom-btn ms-2">
                    <i class="fa-solid fa-file-export text-light"></i> Export
                </a>
            </div>
        </div>
        <div class="card-body custom-padding">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="text-muted mb-0">
                    <i class="fas fa-info-circle"></i> These are the shareholders that have access to FRISMOBILE APP.
                </p>
                <form class="d-flex" method="GET" action="">
                    <div id="loader"></div>
                    <input class="form-control me-2" type="search" name="search" id="searchInput" placeholder="Search shareholders" aria-label="Search">
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
                    <tbody>
                    
                    </tbody>
                </table>
            </div>
            <!-- Pagination Container -->
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