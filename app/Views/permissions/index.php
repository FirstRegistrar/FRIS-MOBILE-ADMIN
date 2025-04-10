<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>

<div class="card">
    <div class="card-header bg-dark text-white">
        <h4>Permissions</h4>
        <a href="<?= site_url('permissions/create') ?>" class="btn btn-primary float-end">Add Permission</a>
    </div>
    <div class="card-body">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Permission Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($permissions)): ?>
                    <?php foreach ($permissions as $index => $permission): ?>
                        <tr>
                            <td><?= $index + 1 ?></td>
                            <td><?= esc($permission['name']) ?></td>
                            <td>
                                <a href="<?= site_url('permissions/edit/' . $permission['id']) ?>" class="btn btn-sm btn-warning">Edit</a>
                                <a href="<?= site_url('permissions/delete/' . $permission['id']) ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this permission?')">Delete</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="3" class="text-center">No permissions found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?= $this->endSection() ?>
