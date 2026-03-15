SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS pokedex;
USE pokedex;

-- --------------------------------------------------------
-- Tabla de tipos de pokemon
-- --------------------------------------------------------

CREATE TABLE `tipo_pokemon` (
    `id` int(11) NOT NULL,
    `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tipo_pokemon` (`id`, `tipo`) VALUES
(1, 'Fuego'),
(2, 'Eléctrico'),
(3, 'Agua');

-- --------------------------------------------------------
-- Tabla de pokemon
-- --------------------------------------------------------

CREATE TABLE `pokemon` (
    `id` int(11) NOT NULL,
    `nombre` varchar(100) NOT NULL,
    `numero` varchar(10) NOT NULL,
    `descripcion` varchar(500) NOT NULL,
    `tipo_id` int(11) NOT NULL,
    `imagen` varchar(500) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pokemon` (`id`, `nombre`, `numero`, `descripcion`, `tipo_id`, `imagen`) VALUES
(1, 'Charizard', '#006',
'Charizard vuela por los cielos en busca de rivales poderosos. Exhala llamas tan calientes que pueden derretir cualquier cosa. Nunca dirige su fuego feroz hacia un oponente más débil que él.',
1,
'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'),

(2, 'Pikachu', '#025',
'Pikachu almacena electricidad en las bolsas de sus mejillas. Cuando se encuentra con algo nuevo o se emociona, puede liberar descargas eléctricas de alto voltaje.',
2,
'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'),

(3, 'Squirtle', '#007',
'Squirtle se protege dentro de su resistente caparazón y dispara agua a presión para atacar a sus rivales.',
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
    `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Índices
-- --------------------------------------------------------

ALTER TABLE `pokemon`
    ADD PRIMARY KEY (`id`),
    ADD KEY `tipo_id` (`tipo_id`);

ALTER TABLE `tipo_pokemon`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `usuarios`
    ADD PRIMARY KEY (`username`);

-- --------------------------------------------------------
-- AUTO_INCREMENT
-- --------------------------------------------------------

ALTER TABLE `pokemon`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tipo_pokemon`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- --------------------------------------------------------
-- Llaves foráneas
-- --------------------------------------------------------

ALTER TABLE `pokemon`
    ADD CONSTRAINT `pokemon_ibfk_1`
    FOREIGN KEY (`tipo_id`)
    REFERENCES `tipo_pokemon` (`id`);

COMMIT;