window.onload = async function() {
    try {
        let lista = await getCoches();
        pintarCoches(JSON.parse(lista));
    } catch (error) {
        console.log("Error al obtener los coches:", error);
    }
}

async function getCoches() {
    let headersList = {}; 

    let response = await fetch("/api/coches", { 
        method: "GET",
        headers: headersList
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener la lista de coches.");
    }

    let data = await response.text();

    return data; 
}

function pintarCoches(lista) {
    let tbody = document.getElementById("tablaCoches");

    lista.forEach(coche => {
        let fila = `
            <tr id="fila-${coche.matricula}">
                <td>${coche.matricula}</td>
                <td>${coche.marca}</td>
                <td>${coche.modelo}</td>
                <td>${coche.descripcion}</td>
                <td>${coche.precio}€</td>
                <td><img src="./assets/${coche.foto}" alt="${coche.marca} ${coche.modelo}" style="width:80px; border-radius:5px;"></td>
                <td><button class="btn btn-primary" onclick="editarCoche('${coche.matricula}')">Editar</button></td>
                <td><button class="btn btn-primary" onclick="borrarCoche('${coche.matricula}')">Borrar</button></td>
            </tr>
        `;
        // Agregamos la fila al tbody
        tbody.innerHTML += fila;
    });
}

async function borrarCoche(matricula) {
    if (!confirm(`¿Seguro que quieres eliminar el coche con matrícula ${matricula}?`)) return;

    try {
        // 🔹 Si tienes backend, enviamos la matrícula al servidor
        let response = await fetch(`/api/coches/${matricula}`, 
            { method: "DELETE" });

        if (!response.ok) 
            throw new Error("Error al eliminar el coche");

        // 🔹 Eliminamos la fila del DOM
        let fila = document.getElementById(`fila-${matricula}`);
        if (fila) fila.remove();
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el coche.");
    }
}


