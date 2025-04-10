<?= $this->extend('layouts/main') ?> 
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
                <i class="fas fa-edit" style="color: #113f6d;"></i> Edit Role
            </h5>
            <a href="<?= site_url('roles') ?>" class="btn custom-btn-secondary">
                <i class="fas fa-arrow-left"></i> Back
            </a>
        </div>
        <div class="card-body custom-padding">
            <p class="mb-4">
                Update the details of the role below. Make sure all fields are correctly filled before saving changes.
            </p>

            <form action="<?= site_url('roles/update/' . $role['id']) ?>" method="post">
                <?= csrf_field() ?>

                <div class="mb-3">
                    <label for="name" class="form-label">Role Name</label>
                    <input type="text" class="form-control" id="name" name="name" value="<?= esc($role['name']) ?>" required>
                    <div class="invalid-feedback">Please enter a valid role name.</div>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" placeholder="Enter role description" required><?= esc($role['description']) ?></textarea>
                    <div class="invalid-feedback">Please enter a valid description.</div>
                </div>

                <button type="submit" class="btn custom-btn">
                    <i class="fas fa-save"></i> Update Role
                </button>
                <a href="<?= site_url('roles') ?>" class="btn custom-btn-secondary">
                    <i class="fas fa-times"></i> Cancel
                </a>
            </form>
        </div>
    </div>
</div>

<script>
    // Live validation for the role name and description fields
    document.getElementById('name').addEventListener('input', function() {
        if (this.value.trim() === '') {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    document.getElementById('description').addEventListener('input', function() {
        if (this.value.trim() === '') {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });
</script>

<?= $this->endSection() ?>
