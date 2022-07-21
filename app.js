$(document).ready(function () {
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
                console.log(response);
                let tasks_list = JSON.parse(response);
                console.log(response);
                let template_list = '';
                tasks_list.forEach(task => {
                    template_list += `<tr>
                        <td>${task.id}</td>
                        <td>${task.nombre}</td>
                        <td>${task.descripcion}</td>
                    </tr>`
                });
                $('#tasks').html(template_list);
            }
        })
    }
});