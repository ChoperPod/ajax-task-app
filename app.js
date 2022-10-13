$(document).ready(function () {
//variable que condiciona si el boton guardara o actualizara el elemento
    let editando = false; 
    console.log('JQuery esta funcionando');
    $('#task-result').hide();
    fetchTask();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            //console.log(search);
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    //console.log(response);
                    //let tarea = JSON.stringify(response);
                    let tasks = JSON.parse(response);
                    let template = '';
                    //console.log(tasks);
                    tasks.forEach(task => {
                        //console.log(task);
                        template += `<li>
                    ${task.nombre}
                    </li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        } else $('#task-result').hide();
    })

    $('#task-form').submit(function (e) {
        console.log('guardando...');
        const postData = {
            name: $('#name').val(),
            description: $('#description').val()
        };
        //console.log(postData);
        $.post('task-add.php', postData, function (response) {
            //console.log(response);
            fetchTask();
            $('#task-form').trigger("reset");
        });
        e.preventDefault();
    });

    // esta parte del codigo se ejecuta apenas la aplicacion se inicia

    function fetchTask() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                //console.log(response);
                let tasks_list = JSON.parse(response);
                //console.log(response);
                let template_list = '';
                tasks_list.forEach(task => {
                    template_list += `<tr task-id = "${task.id}">
                        <td>${task.id}</td>
                        <td>
                            <a href="#" class = "task-item">${task.nombre}</a>
                        </td>
                        <td>${task.descripcion}</td>
                        <td>
                            <button class = "task-delete btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>`
                });
                $('#tasks').html(template_list);
            }
        })
    }
    $(document).on('click', '.task-delete', function () {
        if (confirm('Estas seguro de eliminar el registro?')) {
            //console.log('clicked');
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('task-id');
            //console.log(id);
            $.post('task-delete.php', { id }, function (response) {
                console.log(response);
                fetchTask();
            })
        }

    });

    $(document).on('click', '.task-item', function(){
        //console.log("editando el registro");
        let element_e = $(this)[0].parentElement.parentElement;
        let id_e = $(element_e).attr('task-id');
        console.log(id_e);
        $.post('task-single.php',{id_e}, function(response){
            const task = JSON.parse(response);
            console.log(task.nombre);
            $('#name').val(task.nombre);
            $('#description').val(task.descripcion);
            let editando = true;
        })

    });
});