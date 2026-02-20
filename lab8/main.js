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