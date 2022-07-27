<?php
include('database.php');
if (isset($_POST['id'])) {
    $ID = $_POST['id'];
    $qry = "DELETE FROM TAREAS WHERE ID =  $ID";
    $result = mysqli_query($connection, $qry);
    if (!$result) {
        die('error al eliminar el registro');
    }
    echo "Tarea eliminada satisfactoriamente";
}
