var models = require('../models/index');
var Curso = models.curso;
const read = (req, res) => { };
const update = (req, res) => { };
const remove = (req, res) => { };

const index = async (req, res) => {
    try {
        cursos = await Curso.findAll();
        res.render('curso/index', {
            cursos: cursos,
        });
    } catch(error) {}
};

const create = async (req, res) => {
    console.log("seu token eh: " + req.csrfToken());
    if (req.route.methods.get) {
        res.render('curso/create',{
            csrf: req.csrfToken(),
        });
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

module.exports = { index, read, create, update, remove }