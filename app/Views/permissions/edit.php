<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="card">
    <div class="card-header bg-dark text-white">
        <h4>Edit Permission</h4>
    </div>
    <div class="card-body">
        <form action="<?= site_url('permissions/update/' . $permission['id']) ?>" method="post">
            <?= csrf_field() ?>

            <div class="mb-3">
                <label for="name" class="form-label">Permission Name</label>
                <input type="text" class="form-control" id="name" name="name" value="<?= esc($permission['name']) ?>" required>
            </div>

            <button type="submit" class="btn btn-success">Update Permission</button>
            <a href="<?= site_url('permissions') ?>" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?= $this->endSection() ?>
