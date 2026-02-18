const cantidad1 = document.getElementById("input1");
const cantidad2 = document.getElementById("input2");
const cantidad3 = document.getElementById("input3");

const modifica = () => {

    let c1 = Number(cantidad1.value) * 500;
    let c2 = Number(cantidad2.value) * 600;
    let c3 = Number(cantidad3.value) * 700;

    let total = c1 + c2 + c3;
    let iva = total * 0.16;
    let final = total + iva;

    document.getElementById("precio_total").innerHTML = "$" + total;
    document.getElementById("iva").innerHTML = "$" + iva;
    document.getElementById("precio_final").innerHTML = "$" + final;
}

cantidad1.addEventListener("input", modifica);
cantidad2.addEventListener("input", modifica);
cantidad3.addEventListener("input", modifica);