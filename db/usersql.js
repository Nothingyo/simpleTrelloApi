var UserSQL = {  
    insert:'INSERT INTO userinfo(email,password) VALUES(?,?)', 
    queryAll:'SELECT * FROM userinfo',  
    loginVerify: 'SELECT id FROM userinfo WHERE email = ? AND password = ?',
    getUserById:'SELECT * FROM userinfo WHERE id = ? ',
  };
module.exports = UserSQL