document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formCoche").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que el formulario recargue la página

        // Capturamos los datos del formulario
        let matricula = document.getElementById("matricula").value;
        let marca = document.getElementById("marca").value;
        let modelo = document.getElementById("modelo").value;
        let descripcion = document.getElementById("descripcion").value;
        let precio = document.getElementById("precio").value;
        let foto = document.getElementById("foto").files[0]; // Archivo seleccionado

        if (!matricula || !marca || !modelo || !descripcion || !precio || !foto) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Crear un objeto FormData para enviar archivos
        let formData = new FormData();
        formData.append("matricula", matricula);
        formData.append("marca", marca);
        formData.append("modelo", modelo);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("foto", foto);

        try {
            let response = await fetch("/api/coches", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Error al añadir el coche.");

            document.getElementById("mensaje").innerText = "✅ Coche añadido correctamente.";
            document.getElementById("formCoche").reset(); // Reseteamos el formulario

            // Redirigimos después de 2 segundos
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("mensaje").innerText = "❌ No se pudo añadir el coche.";
        }
    });
});
