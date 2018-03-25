const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const saltRounds = 10;
  const usersDb = req.root.Users;
  bcrypt.hash(req.body.password, saltRounds)
  .then(async(hashedPassword) => {
    try {
      await usersDb.insert({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        motivation: req.body.motivation,
      })
    } catch (err) {
      console.error(`The error is ${JSON.stringify(err)}`);
      res.status(409).send('Username already exists')
    }
  }).
  catch((err) => {
    console.error(`The error is: ${err}`);
    res.status(500).send(`The error is: ${err}`)
  });
  res.status(200).send('Successfully signed up for No Meat May!')
}
