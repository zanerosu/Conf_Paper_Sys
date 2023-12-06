function Validation(values){
    let error = {}

    //Check if username field is empty
    if (values.username === ""){
        error.username = "Username cannot be empty!"
    }
    else {
        error.username = ""
    }

    //Check if password field is empty 
    if (values.password === ""){
        error.password = "Password cannot be empty!"
    }
    else{
        error.password = ""
    }

    return error; 
}

export default Validation;