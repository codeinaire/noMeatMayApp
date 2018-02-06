const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  const saltRounds = 10;
  // have to validate to see if the user already exists?
  bcrypt.hash(req.body.password, saltRounds)
  .then(async(hashedPassword) => {
    const usersDb = req.root.Users;
    let returnDb;
    try {
      returnDb = await usersDb.insert({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword,
        motivation: req.body.motivation,
      })
    } catch (error) {
      console.error(`The error is ${error}`);
    }
    console.log('this is hash', returnDb);
  }).
  catch((err) => {
    console.error(`The error is: ${err}`);
  });
  res.send('yay, this be working')
}
