<?php

use LDAP\Result;

include('database.php');

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];

$qry = "UPDATE TAREAS SET nombre = '$name', descripcion = '$description' WHERE id = '$id'";

$result = mysqli_query($connection, $qry);
if (!$result) {
    die('Actualizacion fallida');
}
echo 'Actualizacion correcta';
