<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="card">
    <div class="card-header bg-dark text-white">
        <h4>Create Permission</h4>
    </div>
    <div class="card-body">
        <form action="<?= base_url('index.php/permissions/store') ?>" method="post">
            <?= csrf_field() ?>

            <div class="mb-3">
                <label for="name" class="form-label">Permission Name</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>

            <button type="submit" class="btn btn-success">Create Permission</button>
            <a href="<?= base_url('index.php/permissions') ?>" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?= $this->endSection() ?>
