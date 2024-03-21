import {pool} from './run.js';

export const insert = async (table, data) => {
    const names = ["alise", "bob", "charlie", "david", "emma", "frank", "george", "harry", "isabelle", "jacob"];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
    const websites = ["google.com", "youtube.com", "facebook.com", "baidu.com", "wikipedia.org", "yahoo.com", "amazon.com", "qq.com", "twitter.com", "live.com"];
    const companyNames = ["Google", "YouTube", "Facebook", "Baidu", "Wikipedia", "Yahoo", "Amazon", "QQ", "Twitter", "Live"];
    const phones = [1234567890, 2345678901, 3456789012, 4567890123, 5678901234, 6789012345, 7890123456, 8901234567, 9012345678, 1234567890];
    for (let i = 0; i < 10; i++) {
        await pool.query(`INSERT INTO Users (id, name, username, email, city, phone, website, companyName) 
        VALUES (${i + 1}, '${names[i]}', '${names[i]}${i+1}', '${names[i]}@gmail.com', '${cities[i]}', ${phones[i]}, '${websites[i]}', '${companyNames[i]}')`);
    }
    for (let i = 0; i < 10; i++) {
        await pool.query(`INSERT INTO Todos (userID, id, title, completed) 
        VALUES (${i + 1}, ${i + 1}, 'Task ${i + 1}', ${i % 2 === 0})`);
    }
    for (let i = 0; i < 10; i++) {
        await pool.query(`INSERT INTO Posts (id, userID, title, body) 
        VALUES (${i + 1}, ${i + 1}, 'Post ${i + 1}', 'This is the body of post ${i + 1}')`);
    }
    for (let i = 0; i < 10; i++) {
        await pool.query(`INSERT INTO Comments (postID, id, name, body, userID) 
        VALUES (${i + 1}, ${i + 1}, 'Comment ${i + 1}', 'This is the body of comment ${i + 1}', ${i + 1})`);
    }
    for (let i = 0; i < 10; i++) {
        await pool.query(`INSERT INTO Passwords (userID, password) VALUES (${i+1}, '${websites[i]}')`);
    }
}