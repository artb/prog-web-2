const bcrypt = require('bcryptjs');
const models = require("../models/index");


const User = models.user;
const Curso = models.curso;
const rounds = 5;

const partida = (req, res) => {
    if (!req.params.color) {
        res.render('main/choosecolor');
    } else {
        res.render('main/game', {
            color: req.params.color,
            partida: 1
        });

    }
}

const index = (req, res) => {
    if (req.session.uid) {
      res.render("main/index", { me: true });
    } else {
      res.render("main/index", { me: false });
    }
  };

const sobre = (req, res) => {
    res.render('main/sobre', {
        layout: 'main'
    });
};

const socket = (req, res) => {
    res.render('main/socket');
};

const login = async (req, res) => {
    if (req.route.methods.get) {
        res.render("main/login", { csrf: req.csrfToken() });
    } else {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                bcrypt.compare(req.body.senha, user.senha, (err, ok) => {
                    if (ok) {
                        req.session.uid = user.id;
                        res.redirect("/");
                    } else {
                        console.log("DEU ERRO " + err);
                        res.render('main/login', {
                            csrf: req.csrfToken()
                        });
                    }
                });
            }
        } catch (error) { }
    }
};

const signup = async (req, res) => {
    try {
      const cursos = await Curso.findAll();
  
      if (req.route.methods.get) {
        res.render("main/signup", { cursos: cursos, csrf: req.csrfToken() });
      } else {
        try {
          const senha = req.body.senha;
          const confirmaSenha = req.body.confirmaSenha;
  
          if (senha != confirmaSenha) {
            res.render("main/signup", { error: "Senhas não conferem." });
          } else if (req.body.lerTermos != "on") {
            res.render("main/signup", {
              error: "Você deve aceitar os termos de uso."
            });
          } else {
            bcrypt.genSalt(rounds, function(err, salt) {
              bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                await User.create({
                  nome: req.body.nome,
                  email: req.body.email,
                  senha: hash,
                  cursoId: req.body.cursoId
                });
              });
            });
  
            res.redirect("/success");
          }
        } catch (error) {
          res.render("curso/create", {
            user: req.body,
            errors: error.errors
          });
          console.log(error);
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  };

const logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            return console.log(err);
        }
        res.redirect("/");
    });
};
module.exports = { login, signup, index, sobre, logout, socket, partida };