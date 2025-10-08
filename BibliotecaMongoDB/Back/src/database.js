import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "biblioteca",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("banco de dados conectado: ");

        const db = conn.connection.db
        await Promise.all([
            db.createCollection("usuarios").catch(() => {}),
            db.createCollection("livros").catch(() => {}),
            db.createCollection("emprestimos").catch(() => {})
        ])
        console.log("base criada");

    } catch (error) {
        console.error("Erro ao conectar")
        process.exit(1);

    }
}

export default connectDb;