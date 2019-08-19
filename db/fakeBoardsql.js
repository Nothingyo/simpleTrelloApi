var FakeBoardSQL = {
    queryAll:'SELECT * FROM board',  
    delteBoardById:'DELETE FROM board WHERE bid=?',
    addBoard:'INSERT INTO board(title) VALUES(?)',
  };
module.exports = FakeBoardSQL