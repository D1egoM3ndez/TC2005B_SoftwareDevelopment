SELECT Nombre
FROM Actor as 'A', Elenco as 'E'
WHERE A.Sexo = 'F' and E.Titulo = 'Las brujas de Salem'
and A.Nombre = E.Nombre;

SELECT Nombre
FROM Elenco as 'E'
WHERE E.titulo = "La sbrujas de Salem"
and Nombre IN (SELECT Nombre From Actor as 'A' WHERE A.sexo = 'F');

/*=======================*/

SELECT Nombre
FROM Pelicula as 'P', Elenco as 'E'
WHERE P.titulo = E.titulo
AND P.Nomestudio = 'MGM'
AND P.Año = 1995;

SELECT Nombre
FROM Elenco as 'E'
WHERE E.Titulo IN (SELECT Titulo
                   FROM Pelicula as 'P'
                   WHERE P.año = 1995
                   AND P.nomestudio = 'MGM');

/*=======================*/

SELECT Titulo
FROM Pelicula as 'P'
WHERE P.Duracion > (SELECT Duracion
                    FROM Pelicula
                    WHERE Titulo = 'Lo que el viento se llevo'
                    AND Año = 1939);

/*=======================*/

SELECT Nombre, COUNT(idProductor) as 'numPeliculas'
FROM Productor as 'prod', Pelicula as 'pel'
WHERE pro.idProductor = pel.idProducor
AND numPeliculas > (SELECT COUNT(idProductor)
FROM Productor as 'prod', Pelicula as 'pel'
WHERE pro.idProductor = pel.idProducor and prod.Nombre = 'George Lucas')
GROUP BY prod.nombre;

/*=======================*/

SELECT Productor.Nombre
FROM Productor, Pelicula, Elenco
WHERE Productor.idProductor = Pelicula.idProductor and Pelicula.titulo = Elenco.titulo
  and Pelicula.año = Elenco.año and Elenco.Nombre = 'Sharon Stone';

SELECT Productor.Nombre
FROM Productor, Pelicula
WHERE Productor.idProductor = Pelicula.idProductor
AND P.Titulo IN (SELECT Titulo FROM Elenco WHERE Elenco.Nombre = 'Sharon Stone');

/*=======================*/

SELECT Titulo
FROM Pelicula
GROUP BY Titulo
HAVING COUNT (*) > 1;

SELECT Titulo
FROM pelicula
WHERE Titulo IN (
    SELECT Titulo
    FROM Pelicula
    GROUP BY Titulo
    HAVING COUNT(*) > 1
    );