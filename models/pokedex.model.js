const pokedex = [
    {
        nombre: "Charizard",
        tipo: "Fuego",
        numero: "#006",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
        descripcion: "Charizard vuela por los cielos en busca de rivales poderosos. Exhala llamas tan calientes que pueden derretir cualquier cosa. Nunca dirige su fuego feroz hacia un oponente más débil que él."
    },
    {
        nombre: "Pikachu",
        tipo: "Eléctrico",
        numero: "#025",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
        descripcion: "Pikachu almacena electricidad en las bolsas de sus mejillas. Cuando se encuentra con algo nuevo o se emociona, puede liberar descargas eléctricas de alto voltaje. Si se enfada, descarga toda la energía acumulada de una sola vez."
    },
    {
        nombre: "Squirtle",
        tipo: "Agua",
        numero: "#007",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        descripcion: "Squirtle se protege dentro de su resistente caparazón y dispara agua a presión para atacar a sus rivales. Cuando retrae su largo cuello, puede lanzar potentes chorros de agua con gran precisión."
    },
];

module.exports = class Pokedex {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nnombre, ntipo, nnumero, nimagen, ndescripcion) {
        this.nombre = nnombre;
        this.tipo = ntipo;
        this.numero = nnumero;
        this.imagen = nimagen;
        this.descripcion = ndescripcion;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        pokedex.push(this);
    }
    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return pokedex;
    }

}