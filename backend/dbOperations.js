const mongoose = require('mongoose');

//DB SCHEMA AND MODEL
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

const Users = mongoose.model("Users", userSchema);


//DB OPERATIONS
const loginUser = async(userCredentials) => {
    console.log("logging in a user...");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.find({username: userCredentials.username, password: userCredentials.password})
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}

const signUpUser = async(userCredentials) => {
    console.log("signing up a user...");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.create({
            username: userCredentials.username,
            email: userCredentials.email,
            password: userCredentials.password,
            firstName: userCredentials.firstName,
            lastName: userCredentials.lastName
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}


module.exports = {
    loginUser,
    signUpUser
}