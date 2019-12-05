var models = require("../models/index");
var User = models.user;
var Curso = models.curso;

const index = async (req, res) => {
  try {
    users = await User.findAll({
      include: [
        {
          model: Curso,
          as: "curso"
        }
      ]
    });
    res.render("user/index", { users });
  } catch (error) {}
};

const read = async (req, res) => {
  try {
    curso = await User.findByPk(req.params.id, {
      include: [
        {
          model: Curso,
          as: "curso"
        }
      ]
    });
    res.render("user/read", { user });
  } catch (error) {}
};

const update = async (req, res) => {
  if (req.route.methods.get) {
    curso = await Curso.findByPk(req.params.id);
    res.render("curso/update", {
      csrf: req.csrfToken(),
      curso: curso
    });
  } else {
    try {
      console.log(req.body);
      curso = await Curso.update(
        {
          nome: req.body.nome,
          descricao: req.body.descricao,
          areaId: req.body.areaId
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
      res.redirect("/curso");
    } catch (error) {
      console.log(error);
    }
  }
};

const remove = async (req, res) => {
  try {
    curso = await Curso.destroy({ where: { id: req.params.id } });
  } catch (error) {}
  res.redirect("/curso");
};

module.exports = { index, read, create, update, remove };
