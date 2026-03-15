const db = require('../util/database');

module.exports = class Tipo {

    static async getOrCreate(tipo) {

        // Buscar si el tipo ya existe
        const [rows] = await db.execute(
            'SELECT id FROM tipo_pokemon WHERE LOWER(tipo) = LOWER(?)',
            [tipo]
        );

        if (rows.length > 0) {
            return rows[0].id;
        }

        // Si no existe, lo crea
        const [result] = await db.execute(
            'INSERT INTO tipo_pokemon (tipo) VALUES (?)',
            [tipo]
        );

        return result.insertId;
    }

}