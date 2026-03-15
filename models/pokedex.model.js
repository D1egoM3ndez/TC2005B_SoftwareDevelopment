const db = require('../util/database');

module.exports = class Pokedex {

    constructor(nnombre, ntipo, nnumero, nimagen, ndescripcion) {
        this.nombre = nnombre;
        this.tipo = ntipo;
        this.numero = nnumero;
        this.imagen = nimagen;
        this.descripcion = ndescripcion;
    }

    save() {
        return db.execute(
            'INSERT INTO pokemon (nombre, tipo_id, numero, imagen, descripcion) VALUES (?, ?, ?, ?, ?)',
            [this.nombre, this.tipo, this.numero, this.imagen, this.descripcion]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM pokemon');
    }

    static fetchOne(nombre) {
    return db.execute(
        `SELECT p.nombre, p.numero, p.descripcion, p.imagen, t.tipo
        FROM pokemon p
        JOIN tipo_pokemon t ON p.tipo_id = t.id
        WHERE LOWER(p.nombre) = LOWER(?)`,
        [nombre]
    );
}

}