import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const usuario = await Usuario.create(req.body);
        res.json(usuario);
    }catch (error){
        res.status(400).json({ error: "Erro ao criar usuário" });
    }
})

router.get('/', async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
})

router.delete('/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuário deletado" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar usuário" });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar usuário" });
    }
})




export default router;
