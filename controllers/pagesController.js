const mysql = require('mysql');

const pool = mysql.createPool({
    limit: 1000000,
    host: 'localhost',
    user: 'root',
    password: 'Ramo0404',
    database: "crud_app"
})



const home = (req, res) => {
    res.render('main');
}

const login = (req, res) => {
    res.render('login');
}


const userLogin = (req, res) => {
    
    pool.getConnection((error, connection)=>{
        //const info = req.body;
        //const email = info.email; 
        if (error) throw error;
        const email = req.body.email;
        const password = req.body.password;
        const sql ="SELECT * FROM users where email ='" + email +"' AND password_ ='" +password +"';"
        //const sql = `SELECT * FROM users WHERE email=${info.email} AND password_=${info.password}`;
        connection.query(sql,[email, password],(error,results)=>{
            if (error) throw error;
            if (results.length > 0) {
                console.log(email, password);
                res.render("home");
            }
            else {
                res.render('login', {message: 'wrong password or email'})
            }
        })
    })
}


const signup = (req, res) => {
    res.render('signup');
}


// save all the infos for user
const register = (req, res) => {
    pool.getConnection((error, connection)=>{
        const info = req.body; 
        if (error) throw error;
        connection.query('SELECT email FROM users WHERE email=?', [info.email],(error,results)=>{

            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                return res.render('signup', {
                    message: 'that email is already in use'
                })
            }
            else if (info.password !== info.passwordConfirm) {
                return res.render('signup', {
                    message: 'passwords do not match'
                })
            }

            const sql = `INSERT INTO users SET name_=?, lastname_=?, username=?, email=?, password_=?, password_1=?`;
            connection.query(sql,[info.name,info.lastname,info.username,info.email,info.password,info.passwordConfirm], (error, data)=>{
                if (error) throw error;
                else
                {
                    return res.redirect('login')
                }
            })
        })

    })
}



const forgotpassword = (req, res) => {
    res.render('resetpassword');
}


const resetPassword = (req, res) => {
    const info = req.body;

    pool.getConnection((error,connection)=>{
        connection.query('SELECT email FROM users WHERE email = ?', [info.email], async (error, results) => {
            if (error) {
                console.log(error);
            }
    
            if (!results.length > 0) {
                return res.render('resetpassword', {
                    message: 'no such email address'
                })
    
            }
            else if (info.password !== info.passwordConfirm) {
                return res.render('resetpassword', {
                    message: 'passwords do not match'
                })
            }
            const sql = `UPDATE  users SET password_= ? WHERE email = '${info.email}'`
            connection.query(sql, [info.password], (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                    return res.render('resetpassword', {
                        message: 'password updated successfully'
                    })
                }
            })
    
        })
    })
}

const fail = (req,res) => {
    res.render('404');
}



module.exports = {
    home: home,
    login:login,
    userLogin:userLogin,
    signup:signup,
    register: register,
    forgotpassword:forgotpassword,
    resetPassword:resetPassword,
    fail:fail
}