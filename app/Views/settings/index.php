<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
                <i class="fas fa-cog" style="color: #113f6d;"></i> Settings
            </h5>
            <a href="/dashboard" class="btn custom-btn-secondary">
                <i class="fas fa-arrow-left"></i> Back
            </a>
        </div>
        <div class="card-body custom-padding">
            <p class="mb-4">
                Customize your application settings below.
            </p>

            <?php if (session()->getFlashdata('success')) : ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="fas fa-check-circle"></i> <?= session()->getFlashdata('success') ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php endif; ?>

            <form action="/settings/update" method="post">
                <?= csrf_field() ?>

                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" name="dark_mode" id="darkModeToggle" 
                           <?= $user['dark_mode'] ? 'checked' : '' ?>>
                    <label class="form-check-label" for="darkModeToggle">
                        <i class="fas fa-moon"></i> Enable Dark Mode
                    </label>
                </div>

                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" name="email_notifications" id="emailNotificationToggle"
                           <?= $user['email_notifications'] ? 'checked' : '' ?>>
                    <label class="form-check-label" for="emailNotificationToggle">
                        <i class="fas fa-envelope"></i> Email Notifications
                    </label>
                </div>

                <button type="submit" class="btn custom-btn">
                    <i class="fas fa-save"></i> Save Settings
                </button>
                <a href="/dashboard" class="btn custom-btn-secondary">
                    <i class="fas fa-times"></i> Cancel
                </a>
            </form>
        </div>
    </div>
</div>

<?= $this->endSection() ?>
