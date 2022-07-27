<?php
include('database.php');
//if (isset($_POST['id_e'])){
    $id = $_POST['id_e'];
    $qry = "SELECT * FROM tareas WHERE ID = $id";
    $result = mysqli_query($connection,$qry);
    if(!$result){
        die('no se puede editar el registro');
    }
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'id' => $row['id']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
//}


?>