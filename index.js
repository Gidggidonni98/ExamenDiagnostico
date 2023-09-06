//GET////////////////////////////////

const findUser = async () => {
  await $.ajax({
    method: "GET",
    headers: { Accept: "application/json" },
    url: "https://reqres.in/api/users",
  }).done(function (res) {
    content = "";
    datos = res.data;
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
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoUser(${datos[i].id})' data-target='#update'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal'  data-target='#eliminar'><i class="fas fa-trash"></i></button>
                </td>
            </tr>
                `;
    }
    $("#tablaUsers > tbody").html(content);
  });
};

findUser();

//CREATE////////////////////////////

const createUser = async () => {
  let firstName = document.getElementById("first_name").value;
  let lastName = document.getElementById("last_name").value;
  let correo = document.getElementById("email").value;
  if (firstName != "" || correo != "" || lastName) {
    let datos = {
      first_name: firstName,
      last_name: lastName, 
      email: correo
    }
    
    fetch('https://reqres.in/api/users', {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {
      console.log(response)
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = "";
      document.getElementById("email").value = "";
      $('#createUser').modal('hide')
      Swal.fire({
        title: "Se ha creado correctamente",
        confirmButtonText: "Aceptar",
        icon: "success",
      });
    }) 
    .catch(err => console.log(err));


  } else {
    Swal.fire({
      title: "Rellena los campos primero",
      confirmButtonText: "Aceptar",
      icon: "error",
    });
  }
};

//DELETE////////////////////////////////

const downUser = async () => {
  fetch("https://reqres.in/api/users/2", {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      Swal.fire({
        title: "Se ha eliminado correctamente",
        confirmButtonText: "Aceptar",
        icon: "success",
      });
      $('#eliminar').modal('hide')
    })
    
};


//UPDATE////////////////////////////////
getInfoUser = (id) => {
  fetch('https://reqres.in/api/users/'+id)
  .then(response => response.json()) 
  .then(data => {
    datos = data.data;
    console.log(datos.first_name)
    document.getElementById("id_update").value = datos.id;
    document.getElementById("first_name_update").value = datos.first_name;
    document.getElementById("last_name_update").value = datos.last_name;
    document.getElementById("email_update").value = datos.email;
  })
  
}

updateUser = () => {
  id_update = document.getElementById("id_update").value;
  first_name_update = document.getElementById("first_name_update").value;
  last_name_update = document.getElementById("last_name_update").value;
  email_udpate = document.getElementById("email_update").value;

  if (first_name_update != "" || email_udpate != "" || last_name_update) {
    let datos = {
      first_name: first_name_update,
      last_name: last_name_update, 
      email: email_udpate,
    }
    
    fetch('https://reqres.in/api/users/' + id_update, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {"Content-type": "application/json; charset=UTF-8" ,  Accept: "application/json" }
    })
    .then(response => {
      console.log(response)
      $('#update').modal('hide')
      Swal.fire({
        title: "Se ha actualizado correctamente",
        confirmButtonText: "Aceptar",
        icon: "success",
      });
    }) 
    .catch(err => console.log(err));


  } else {
    Swal.fire({
      title: "Rellena los campos primero",
      confirmButtonText: "Aceptar",
      icon: "error",
    });
  }

}



