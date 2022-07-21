<?php
include('database.php');
if (isset($_POST['name'])) {
    //echo $_POST['name'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $qry = "INSERT INTO tareas(nombre, descripcion) VALUES('$name','$description')";
    $result = mysqli_query($connection,$qry);
    if(!$result){
        die('La insercion ha fallado');
    }
    echo 'Insercion realizada satisfactoriamente';
}
