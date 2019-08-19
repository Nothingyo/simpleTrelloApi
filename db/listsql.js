var ListSQL = {
    queryAll:'SELECT * FROM list WHERE bid=?',  
    delteBoardById:'DELETE FROM board WHERE bid=?',
    deleteListById:'DELETE FROM list WHERE lid=?',
    addList:'INSERT INTO list(title,bid) VALUES(?,?)',
  };
module.exports = ListSQL