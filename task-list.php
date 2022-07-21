<?php

include('database.php');
$qry = "SELECT * FROM tareas";
$result = mysqli_query($connection, $qry);

if (!$result) {
    die('qry fallida' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'nombre' => $row['nombre'],
        'descripcion' => $row['descripcion'],
        'id' => $row['id']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;
