function Validation(values){
    let error = {}

    if (values.username === ""){
        error.username = "Username cannot be empty!"
    }

    else {
        error.username = ""
    }

    if (values.password === ""){
        error.password = "Password cannot be empty!"
    }

    else{
        error.password = ""
    }

    return error; 
}

export default Validation;