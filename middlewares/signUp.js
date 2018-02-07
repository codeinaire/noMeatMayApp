const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds)
  .then(async(hashedPassword) => {
    const usersDb = req.root.Users;
    try {
      await usersDb.insert({
        username: null,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword,
        motivation: req.body.motivation,
      })
    } catch (error) {
      console.error(`The error is ${JSON.stringify(error)}`);
      res.status(409).send('Email already exists')
    }
  }).
  catch((err) => {
    console.error(`The error is: ${err}`);
  });
}
