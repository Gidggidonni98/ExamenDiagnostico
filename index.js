const findUser = async() =>{
    await $.ajax({
        method: "GET",
        headers: { "Accept": "application/json" },
        url: 'https://reqres.in/api/users?page=2'
    }).done(function(res){
        content = "";
        datos = res.data;
        console.log(datos);
        for (let i = 0; i < datos.length; i++) {
            content += `
            <tr class="text-center">
                <td>${datos[i].id}</td>
                <td>
                    <img src="${datos[i].avatar}">
                </td>
                <td>${datos[i].first_name}</td>
                <td>${datos[i].last_name}</td>
                <td>${datos[i].email}</td>
                <td>
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoUser()' data-target='#detallesCliente'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='getIdUser()' data-target='#eliminar'><i class="fas fa-trash"></i></button>
                </td>
            </tr>
                `;
        };
        $("#tablaUsers > tbody").html(content)
    })
}

findUser();


const createUser = async() => {
    let first_name = document.getElementById('first_name').value;
    let last_name = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    if (first_name != "" || email != "" || last_name) {
        await $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: "https://reqres.in/api/users?page=2",
            data: { first_name, last_name, email }
        }).done(res => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Hubo un error al registrar",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
                findCliente();
            } else {
                Swal.fire({
                    title: "Se ha creado correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
                findCliente();
            }
        });
    } else {
        Swal.fire({
            title: "Rellena los campos primero",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    }
};


const getIdUser = async id => {
    document.getElementById("id_deleteUser").value = id;
};


const downUser = async() => {
    let id = document.getElementById('id_deleteUser').value;
    await $.ajax({
        type: 'DELETE',
        url:'https://reqres.in/api/users?page=2' + id
    }).done(res => {
        console.log(res);
    });
};
