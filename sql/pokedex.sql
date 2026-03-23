SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS pokedex;
USE pokedex;

-- --------------------------------------------------------
-- Tabla de tipos de pokemon
-- --------------------------------------------------------

CREATE TABLE `tipo_pokemon` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `tipo` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tipo_pokemon` (`id`, `tipo`) VALUES
(1, 'Fuego'),
(2, 'Eléctrico'),
(3, 'Agua');

-- --------------------------------------------------------
-- Tabla de pokemon
-- --------------------------------------------------------

CREATE TABLE `pokemon` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `numero` varchar(10) NOT NULL,
    `descripcion` varchar(500) NOT NULL,
    `tipo_id` int(11) NOT NULL,
    `imagen` varchar(500) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `tipo_id` (`tipo_id`),
    CONSTRAINT `pokemon_ibfk_1`
        FOREIGN KEY (`tipo_id`) REFERENCES `tipo_pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pokemon` (`nombre`, `numero`, `descripcion`, `tipo_id`, `imagen`) VALUES
('Charizard', '#006',
'Charizard vuela por los cielos en busca de rivales poderosos.',
1,
'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'),

('Pikachu', '#025',
'Pikachu almacena electricidad en las bolsas de sus mejillas.',
2,
'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'),

('Squirtle', '#007',
'Squirtle se protege dentro de su resistente caparazón.',
3,
'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png');

-- --------------------------------------------------------
-- Tabla de usuarios
-- --------------------------------------------------------

CREATE TABLE `usuarios` (
    `username` varchar(50) NOT NULL,
    `nombre` varchar(100) NOT NULL,
    `password` varchar(500) NOT NULL,
    `correo` varchar(100) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuario Diego
INSERT INTO `usuarios`
(`username`,`nombre`,`password`,`correo`)
VALUES
('D1egoM3ndez','Diego','12345','diegommor@gmail.com');

-- --------------------------------------------------------
-- Tabla de roles
-- --------------------------------------------------------

CREATE TABLE `roles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre_rol` varchar(50) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `roles` (`id`,`nombre_rol`) VALUES
(1,'entrenador'),
(2,'administrador');

-- --------------------------------------------------------
-- Tabla de privilegios
-- --------------------------------------------------------

CREATE TABLE `privilegios` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre_privilegio` varchar(100) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `privilegios` (`id`,`nombre_privilegio`) VALUES
(1,'ver_pokemon'),
(2,'crear_pokemon'),
(3,'editar_pokemon'),
(4,'eliminar_pokemon');

-- --------------------------------------------------------
-- Tabla roles → privilegios
-- --------------------------------------------------------

CREATE TABLE `posee` (
    `id_rol` int(11) NOT NULL,
    `id_privilegio` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id_rol`,`id_privilegio`),
    KEY `id_privilegio` (`id_privilegio`),
    CONSTRAINT `posee_ibfk_1`
        FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`),
    CONSTRAINT `posee_ibfk_2`
        FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Permisos
INSERT INTO `posee` VALUES
(1,1,NOW()), -- entrenador solo puede ver
(2,1,NOW()),
(2,2,NOW()),
(2,3,NOW()),
(2,4,NOW());

-- --------------------------------------------------------
-- Tabla usuarios → roles
-- --------------------------------------------------------

CREATE TABLE `tiene` (
    `id_usuario` varchar(50) NOT NULL,
    `id_rol` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id_usuario`,`id_rol`),
    KEY `id_rol` (`id_rol`),
    CONSTRAINT `tiene_ibfk_1`
        FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`username`),
    CONSTRAINT `tiene_ibfk_2`
        FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Diego es administrador
INSERT INTO `tiene`
VALUES
('D1egoM3ndez',2,NOW());

COMMIT;