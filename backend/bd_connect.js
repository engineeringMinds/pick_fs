const Mysql = require('mysql');

const Connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'dummy_fs_db',
});

Connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to mysql database' + Connection.threadId);
});
