CREATE DATABASE IF NOT EXISTS CARROS;
USE CARROS;
CREATE TABLE coche(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precio DECIMAL(9,2) NOT NULL,
	foto VARCHAR(255)
);
CREATE TABLE usuarios(
	usuario VARCHAR(100) NOT NULL PRIMARY KEY,
    clave VARCHAR(255) NOT NULL,
    perfil VARCHAR(100) NOT NULL,
    fechaUltimoAcceso DATE
);
INSERT INTO `usuarios` (`usuario`, `clave`, `perfil`, `fechaUltimoAcceso`) VALUES ('root', '1234', 'admin', '2022-03-01');
INSERT INTO coche (matricula, marca, modelo, descripcion, precio, foto) VALUES
('1234ABC', 'Toyota', 'Corolla', 'Coche compacto y eficiente', 15000.00, 'toyota.jpg'),
('5678DEF', 'Honda', 'Civic', 'Sedán confiable con buen rendimiento', 18000.00, 'honda.jpg'),
('9012GHI', 'Ford', 'Mustang', 'Coche deportivo con alto rendimiento', 35000.00, 'ford.jpg'),
('3456JKL', 'Chevrolet', 'Camaro', 'Muscle car con diseño elegante', 33000.00, 'chevrolet.jpg'),
('7890MNO', 'BMW', '320i', 'Sedán de lujo con características avanzadas', 40000.00, 'bmw.jpg');
