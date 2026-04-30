const db = require('../util/database');

module.exports = class Pokedex {

    constructor(nnombre, ntipo, nnumero, nimagen, ndescripcion) {
        this.nombre = nnombre;
        this.tipo = ntipo;
        this.numero = nnumero;
        this.imagen = nimagen;
        this.descripcion = ndescripcion;
    }

    async save() {
        // INSERT principal
        const [result] = await db.execute(
            'INSERT INTO pokemon (nombre, tipo_id, numero, imagen, descripcion) VALUES (?, ?, ?, ?, ?)',
            [this.nombre, this.tipo, this.numero, this.imagen, this.descripcion]
        );

        // "Trigger" manual: registrar en auditoría después del INSERT
        const pokemonId = result.insertId;
        await db.execute(
            'INSERT INTO pokemon_log (pokemon_id, nombre, tipo_id, numero, accion, fecha) VALUES (?, ?, ?, ?, ?, NOW())',
            [pokemonId, this.nombre, this.tipo, this.numero, 'INSERT']
        );

        return result;
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

    static fetchLog() {
        return db.execute(
            `SELECT * FROM pokemon_log ORDER BY fecha DESC`
        );
    }
}