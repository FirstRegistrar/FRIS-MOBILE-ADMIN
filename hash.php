<?php
$serverName = "104.211.8.144";
$connectionOptions = array(
    "Database" => "Estock",
    "Uid" => "fris_mobile",
    "PWD" => "12oGruSUj0FMvt4G"
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn) {
    echo "Connected successfully!";
} else {
    die(print_r(sqlsrv_errors(), true));
}
?>
