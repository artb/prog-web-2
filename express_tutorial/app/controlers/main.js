const index = (req, res) => {
    res.render('main/index', {
        layout: 'main'
    });
   };
   const sobre = (req, res) => {
    res.render('main/sobre', {
        layout: 'main'
    });
   };
   module.exports = { index, sobre }