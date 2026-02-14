// ==========================
// EJERCICIO 1
// ==========================

let numero = prompt("Ejercicio 1\nIngresa un número:");

let tabla = "<table>";
tabla += "<tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";

for(let i = 1; i <= numero; i++){
    tabla += "<tr>";
    tabla += "<td>" + i + "</td>";
    tabla += "<td>" + (i*i) + "</td>";
    tabla += "<td>" + (i*i*i) + "</td>";
    tabla += "</tr>";
}

tabla += "</table>";

document.getElementById("ej1").innerHTML = tabla;

// ==========================
// EJERCICIO 2
// ==========================

let num1 = Math.floor(Math.random() * 100);
let num2 = Math.floor(Math.random() * 100);

let inicio = new Date().getTime();
let respuesta = prompt("Ejercicio 2\n¿Cuánto es " + num1 + " + " + num2 + "?");
let fin = new Date().getTime();
let tiempo = (fin - inicio) / 1000;

let resultadoEj2 = "";

if(respuesta == (num1 + num2)){
    resultadoEj2 += "Correcto ✅<br>";
} else {
    resultadoEj2 += "Incorrecto ❌<br>";
    resultadoEj2 += "Respuesta correcta: " + (num1 + num2) + "<br>";
}

resultadoEj2 += "Tiempo: " + tiempo + " segundos";

document.getElementById("ej2").innerHTML = resultadoEj2;

// ==========================
// EJERCICIO 3
// ==========================
function contador(arreglo){
    let negativos = 0;
    let ceros = 0;
    let positivos = 0;

    for(let i = 0; i < arreglo.length; i++){
        if(arreglo[i] < 0){
            negativos++;
        } else if(arreglo[i] === 0){
            ceros++;
        } else {
            positivos++;
        }
    }

    return {negativos, ceros, positivos};
}

let resultadoContador = contador([-3, 0, 5, 8, -1, 0]);

document.getElementById("ej3").innerHTML =
    "Negativos: " + resultadoContador.negativos + "<br>" +
    "Ceros: " + resultadoContador.ceros + "<br>" +
    "Positivos: " + resultadoContador.positivos;

// ==========================
// EJERCICIO 4
// ==========================
function promedios(matriz){
    let resultado = [];

    for(let i = 0; i < matriz.length; i++){
        let suma = 0;
        for(let j = 0; j < matriz[i].length; j++){
            suma += matriz[i][j];
        }
        resultado.push(suma / matriz[i].length);
    }

    return resultado;
}

let matrizEjemplo = [[10,8,9],[7,6,5],[9,9,10]];
let resultadoPromedios = promedios(matrizEjemplo);

document.getElementById("ej4").innerHTML =
    "Promedios: " + resultadoPromedios.join(", ");

// ==========================
// EJERCICIO 5
// ==========================
function inverso(numero){
    return parseInt(numero.toString().split("").reverse().join(""));
}

let numeroInvertido = inverso(12345);

document.getElementById("ej5").innerHTML =
    "Número invertido: " + numeroInvertido;

// ==========================
// EJERCICIO 6
// ==========================

function calcular() {

    let n1 = prompt("Ejercicio 6\nIngresa un número");
    let n2 = prompt("Ejercicio 6\nIngresa otro número");
    let suma = n1 + n2;
    let resta = n1 - n2;
    let multiplicacion = n1 * n2;
    let division = n2 !== 0 ? n1 / n2 : "No se puede dividir entre 0";

    return {suma, resta, multiplicacion, division};
}

let resultado3 = calcular();

document.getElementById("ej6").innerHTML=
    "Suma: " + resultado3.suma + "<br>" +
    "Resta: " + resultado3.resta + "<br>" +
    "Multiplicación: " + resultado3.multiplicacion + "<br>" + 
    "División: " + resultado3.division;