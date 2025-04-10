<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="fas fa-users text-dark"></i> Shareholder Details</h5>
            <div>
                <a href="<?= base_url('shareholders') ?>" class="btn custom-btn ms-2">
                    <i class="fas fa-arrow-left text-light"></i> Back
                </a>
            </div>
        </div>
        <div class="card-body custom-padding">
            <?php if (!empty($shareholder)): ?>
            <div class="card mb-4 shadow-sm info-card">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-id-card"></i> Personal Information
                    </h5>
                    <div class="info-item">
                        <i class="fas fa-user"></i>
                        <span><strong>Name:</strong> <?= esc($shareholder['first_nm'] . ' ' . $shareholder['middle_nm'] . ' ' . $shareholder['last_nm']) ?></span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-envelope"></i>
                        <span><strong>Email:</strong> <?= esc($shareholder['email']) ?></span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span><strong>Phone:</strong> <?= esc($shareholder['phone']) ?></span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-hashtag"></i>
                        <span><strong>Account Number:</strong> <?= esc($shareholder['Acctno']) ?></span>
                    </div>
                </div>
            </div>

            <!-- Shareholding Details -->
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title"><i class="fas fa-chart-line"></i> Shareholding</h5>
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th><i class="fas fa-building"></i> Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($companies)): ?>
                                <?php foreach ($companies as $holding): ?>
                                    <tr>
                                        <td><?= esc($holding['company_name']) ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td class="text-center text-muted"><i class="fas fa-exclamation-circle"></i> No shareholding records found.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Login History -->
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title"><i class="fas fa-history"></i> Login History</h5>
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th><i class="fas fa-calendar-alt"></i> Date</th>
                                <th><i class="fas fa-globe"></i> IP Address</th>
                                <th><i class="fas fa-map-marker-alt"></i> Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($loginHistory)): ?>
                                <?php foreach ($loginHistory as $log): ?>
                                    <tr>
                                        <td><?= esc($log['login_time']) ?></td>
                                        <td><i class="fas fa-network-wired"></i> <?= esc($log['ip_address']) ?></td>
                                        <td><i class="fas fa-map-pin"></i> <?= esc($log['location']) ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="3" class="text-center text-muted"><i class="fas fa-exclamation-circle"></i> No login records found.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <?php else: ?>
            <div class="alert alert-warning text-center"><i class="fas fa-exclamation-triangle"></i> Shareholder not found.</div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?= $this->endSection() ?>
