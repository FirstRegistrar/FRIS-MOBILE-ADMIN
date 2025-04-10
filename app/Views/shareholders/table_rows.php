<?php if (!empty($shareholders)): ?>
    <?php foreach ($shareholders as $shareholder): ?>
        <tr>
            <td><?= esc($shareholder['first_nm']) ?> <?= esc($shareholder['middle_nm']) ?> <?= esc($shareholder['last_nm']) ?></td>
            <td><?= esc($shareholder['full_address']) ?></td>
            <td><?= esc($shareholder['email']) ?></td>
            <td>
                <div class="d-flex gap-2">
                    <a href="/viewActivity?shareholder=<?= esc($shareholder['Acctno']) ?>&email=<?= esc($shareholder['email']) ?>" class="btn btn-outline-warning btn-sm mx-1" title="View Activity">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="#" class="btn btn-outline-danger btn-sm mx-1" title="Ban" onclick="return confirm('Are you sure?')">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </td>
        </tr>
    <?php endforeach; ?>
<?php else: ?>
    <tr>
        <td colspan="9" class="text-center">No shareholders found.</td>
    </tr>
<?php endif; ?>
