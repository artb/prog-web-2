var models = require('../models/index');
var Curso = models.curso;
const index = (req, res) => {};
const read = (req, res) => {};
const update = (req, res) => {};
const remove = (req, res) => {};


const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('curso/create');
    } else {
        try {
        await Curso.create(req.body);
        } catch (e) {
            res.render('curso/create', {
                curso: req.body,
                errors: error.errors
            });
        }
    }
};
   
 
   const showError = function (errors, field) {
    var mensagem;
    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            console.log(error);
            if (error.path == field) {
                mensagem = error.message;
                return;
            }
    });
        return mensagem;
    }
}    

module.exports = { index, read, create, update, remove, showError}