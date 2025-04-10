<?= $this->extend('layouts/main') ?>  
<?= $this->section('content') ?>

<div class="container mt-4">
    <div class="card shadow-lg border-0">
        <div class="card-header bg-white text-black d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="fas fa-user-plus text-dark"></i> Create New User</h5>
            <div>
                <a href="/users" class="btn custom-btn">
                    <i class="fas fa-arrow-left text-light"></i> Back
                </a>
            </div>
        </div>
        <div class="card-body custom-padding">
            <p class="text-muted mb-4">
                Please fill in the details below to create a new user. All fields are required.
            </p>
            <?php if (session()->getFlashdata('error')): ?>
                <div class="alert alert-danger">
                    <?= session()->getFlashdata('error') ?>
                </div>
            <?php endif; ?>
            <form action="/users/store" method="post" class="needs-validation" novalidate>
                <?= csrf_field() ?>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="fullname" class="form-label"><i class="fas fa-user"></i> Full Name</label>
                        <input type="text" class="form-control" name="fullname" placeholder="Enter full name" required>
                        <div class="invalid-feedback">
                            Please enter a valid name.
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label"><i class="fas fa-envelope"></i> Email Address</label>
                        <input type="email" class="form-control" name="email" placeholder="Enter email" required>
                        <div class="invalid-feedback">
                            Please enter a valid email address.
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="password" class="form-label"><i class="fas fa-lock"></i> Password</label>
                        <input type="password" class="form-control" name="password" placeholder="Enter password" required>
                        <div class="invalid-feedback">
                            Password must be at least 6 characters.
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="role_id" class="form-label"><i class="fas fa-user-tag"></i> Role</label>
                        <select class="form-select" name="role_id" required>
                            <option value="" selected>Select Role</option>
                            <?php foreach ($roles as $role) : ?>
                                <option value="<?= $role['id'] ?>"><?= $role['name'] ?></option>
                            <?php endforeach; ?>
                        </select>
                        <div class="invalid-feedback">
                            Please select a role.
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn custom-btn px-4">
                        <i class="fas fa-save text-light"></i> Create User
                    </button>
                    <a href="/users" class="btn custom-btn-secondary px-4 ms-2">
                        <i class="fas fa-times text-light"></i> Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    // Live validation
    (function () {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    })();
</script>

<?= $this->endSection() ?>
