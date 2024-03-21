import {create, drop} from './create.js';
import {insert} from './insert.js';
import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '02042024',
    database: 'jsonplaceholderdemo'
}).promise();

//runs on port 3306
//await drop();
//await create();
//await insert(); //-default for start