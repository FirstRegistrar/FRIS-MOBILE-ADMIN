<?= $this->extend('layouts/main') ?>

<?= $this->section('content') ?>
    <div class="text-center">
        <h1 class="text-danger">Unauthorized Access</h1>
        <p>You do not have permission to view this page.</p>
        <a href="<?= site_url('/') ?>" class="btn btn-primary">Go Back</a>
    </div>
<?= $this->endSection() ?>
