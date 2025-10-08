import mongoose from 'mongoose';
import Usuario from './Usuario';
import Livro from './Livro';

const emprestimoSchema = new mongoose.Schema({
    usuario : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    livro: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro', required: true },
    dataEmprestimo: { type: Date, default: Date.now },
    dataDevolucao: { type: Date }
})

export default mongoose.model('Emprestimo', emprestimoSchema);