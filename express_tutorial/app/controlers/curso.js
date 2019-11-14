var models = require('../models/index');
var Curso = models.curso;
const read = (req, res) => { };
const update = (req, res) => { };
const remove = (req, res) => { };

const index = async (req, res) => {
    const cursos = await Curso.findAll();
    res.render('curso/index', {
        cursos: cursos,
    });
};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('curso/create');
    } else {
        curso = await Curso.create({
            sigla: req.body.sigla,
            nome: req.body.nome,
            descricao: req.body.descricao,
            id_area: req.body.area,
        });
        res.redirect('/curso');
    }
};

module.exports = { index, read, create, update, remove}