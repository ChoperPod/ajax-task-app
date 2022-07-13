$(document).ready(function () {
    console.log('JQuery esta funcionando');
    $('#search').keyup(function (e) {
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
                //console.log(tasks);
                tasks.forEach(task => {
                    console.log(task);
                })
            }

        })
    })
});