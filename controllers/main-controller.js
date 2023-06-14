const Users = require("../models/user.model");

// scaffolding
const app = {};

// Form 
app.mainRoute = (req, res) => {
  res.end();
};
// For saving the data from FORM 
app.saveData = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  Users.create({
    name,
    email,
    phone,
  })
    .then((result) => {
      console.log(" User created");
      res.json(result);
    })
    .catch((err) => console.log(err));
};


// For getting all the users  
app.getAllUsers = (req, res) => {
  Users.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.error("Error fetching users:", err));
};

// For update the user
app.updateUsers = (req, res, next) => {
  console.log("Hello ")
  const userId = req.body.userId;
  const updatedName = req.body.newName;
  const updateEmail = req.body.newEmail;
  const updatePhone = req.body.newPhone;

  Users.findByPk(userId)
    .then((user) => {
      if (user) {
        user.name = updatedName;
        user.email = updateEmail;
        user.phone = updatePhone;
        return user.save();
      } else {
        throw new Error('User not found');
      }
    })
    .then((updatedUser) => {
      console.log("User updated:", updatedUser);
      res.json({ message: 'User updated successfully.' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred.' });
    });
};



// For delete Users
app.deleteUser = (req, res, next) => {
  const id = req.body.userId;

  Users.findByPk(id)
    .then((user) => {
      if (user) {
        return user.destroy();
      } else {
        throw new Error('User not found');
      }
    })
    .then(() => {
      console.log("USER DESTROYED");
      res.json({ message: 'User deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred.' });
    });
};


module.exports = app;
