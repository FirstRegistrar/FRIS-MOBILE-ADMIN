<!-- main_template.php -->
<?= $this->include('components/dashboard/head', ['title' => 'Admin Panel']) ?>
<?= $this->include('components/dashboard/navbar') ?>

<style>
    body {
        position: relative;
        min-height: 100vh;
    }
    body::before {
        content: "";
        background: url('<?= base_url('assets/images/fris_logo.png') ?>') no-repeat bottom left;
        background-size: 25%;
        position: absolute;
        top: -100px;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        z-index: -1;
    }
    .container {
        position: relative;
        z-index: 2;
    }
</style>

<div class="container">
    <div class="row">
        <?php if(uri_string() !== 'dashboard' && uri_string() !== 'reports/user'): ?>
            <div class="col-md-3">
                <?= $this->include('components/dashboard/sidebar') ?>
            </div>
            <div class="col-md-9">
                <?= $this->renderSection('content') ?>
            </div>
        <?php else: ?>
            <div class="col-md-12">
                <?= $this->renderSection('content') ?>
            </div>
        <?php endif; ?>
    </div>
</div>
<script>
    var baseUrl = "<?= base_url(); ?>";
</script>
<script src="<?= base_url('assets/js/dashboard/index.js') ?>"></script>
<?= $this->include('components/dashboard/footer') ?>
