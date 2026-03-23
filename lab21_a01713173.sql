SELECT SUM(Cantidad), SUM (Cantidad * (Costo + Impuesto))
FROM Materiales as M, Entregan as E
WHERE BETWEEN (01/01/1997) AND (31/12/1997)

SELECT P.RazonSocial, COUNT(*) AS Numero_Entregas, SUM(E.Cantidad * (M.Costo + (M.Costo * M.PorcentajeImpuesto)))
FROM Proveedores P
JOIN Entregan E ON P.RFC = E.RFC
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY P.RFC, P.RazonSocial
ORDER BY Importe_Total DESC;

SELECT 
    M.Clave,
    M.Descripcion,
    SUM(E.Cantidad) AS Total_Entregado,
    MIN(E.Cantidad) AS Min_Entrega,
    MAX(E.Cantidad) AS Max_Entrega,
    SUM(E.Cantidad * (M.Costo + (M.Costo * M.PorcentajeImpuesto))) AS Importe_Total
FROM Materiales M
JOIN Entregan E ON M.Clave = E.Clave
GROUP BY M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) > 400
ORDER BY M.Clave;

SELECT 
    P.RazonSocial,
    M.Clave,
    M.Descripcion,
    AVG(E.Cantidad) AS Promedio_Cantidad
FROM Proveedores P
JOIN Entregan E ON P.RFC = E.RFC
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY M.Clave, P.RazonSocial, M.Descripcion
HAVING AVG(E.Cantidad) > 500;

SELECT 
    P.RazonSocial,
    M.Clave,
    M.Descripcion,
    AVG(E.Cantidad) AS Promedio_Cantidad
FROM Proveedores P
JOIN Entregan E ON P.RFC = E.RFC
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY P.RFC, P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) < 370 
    OR AVG(E.Cantidad) > 450;   

SELECT M.cLave, M.Descripcion
FROM Materiales as M
WHERE M.Clave NOT IN (
    SELECT Clave
    FROM Entregan
)

SELECT P.RazonSocial
FROM Proveedores P
WHERE P.RFC IN (
    SELECT E.RFC
    FROM Entregan E
    JOIN Proyectos Pr ON E.Numero = Pr.Numero
    WHERE Pr.Denominacion = 'Vamos México'
)
AND P.RFC IN (
    SELECT E.RFC
    FROM Entregan E
    JOIN Proyectos Pr ON E.Numero = Pr.Numero
    WHERE Pr.Denominacion = 'Querétaro Limpio'
);

SELECT M.Descripcion
FROM Materiales M
WHERE M.Clave NOT IN (
    SELECT E.Clave
    FROM Entregan E
    JOIN Proyectos P ON E.Numero = P.Numero
    WHERE P.Denominacion = 'CIT Yucatán'
);

SELECT 
    P.RazonSocial,
    AVG(E.Cantidad) AS Promedio_Cantidad
FROM Proveedores P
JOIN Entregan E ON P.RFC = E.RFC
GROUP BY P.RazonSocial
HAVING AVG(E.Cantidad) > (
    SELECT AVG(E2.Cantidad)
    FROM Entregan E2
    WHERE E2.RFC = 'VAGO780901'
);

SELECT P.RFC, P.RazonSocial
FROM Proveedores P
WHERE P.RFC IN (
    SELECT E.RFC
    FROM Entregan E
    JOIN Proyectos Pr ON E.Numero = Pr.Numero
    WHERE Pr.Denominacion = 'Infonavit Durango'
)
AND (
    SELECT SUM(E1.Cantidad)
    FROM Entregan E1
    WHERE E1.RFC = P.RFC AND YEAR(E1.Fecha) = 2000
) > (
    SELECT SUM(E2.Cantidad)
    FROM Entregan E2
    WHERE E2.RFC = P.RFC AND YEAR(E2.Fecha) = 2001
);