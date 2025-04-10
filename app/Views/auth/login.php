<?= $this->include('components/head', ['title' => 'Admin Login']) ?>

<div class="card login-card">
    <div class="logo text-center">
        <img src="<?= base_url('assets/images/fris_logo.png') ?>" alt="FRISMobile Logo">
    </div>
    <h3 class="text-center">FRISMOBILE Admin Login</h3>
    <?php if (session()->getFlashdata('error')): ?>
        <div class="alert alert-danger">
            <?= session()->getFlashdata('error'); ?>
        </div>
    <?php endif; ?>
    <form action="<?= base_url('/authenticate') ?>" method="post">
        <?= csrf_field() ?>
        <?php if (session()->getFlashdata('error')): ?>
            <div class="alert alert-danger">
                <?= session()->getFlashdata('error') ?>
            </div>
        <?php endif; ?>
        <div class="input-group mb-3">
            <i class="fas fa-envelope"></i>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" required>
        </div>
        <div class="input-group mb-3">
            <i class="fas fa-lock"></i>
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
        <p class="text-center footer-text mt-4">© <?= date('Y'); ?> FRISMobile Admin. All Rights Reserved.</p>

    </form>
</div>

<?= $this->include('components/footer') ?>
