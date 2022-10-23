const { pool } = require("./db");
const { v4: uuidv4 } = require("uuid");

const insertUserData = async (result) => {
  let username = result.username;
  let password = result.password;
  let userId = await uuidv4();

  return new Promise((resolve, reject) => {
    try {
      let queryString = `INSERT INTO users (userid, username, password) VALUES ($1, $2, $3) RETURNING *`;
      pool.query(queryString, [userId, username, password], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const validateUserData = (result) => {
  let username = result.username;
  let password = result.password;

  return new Promise((resolve, reject) => {
    try {
      let queryString = `select exists(select 1 from users  where username = $1 and password = $2)`;
      pool.query(queryString, [username, password], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createSession = async (result) => {
  let userName = result.username;
  let sessionId = await uuidv4();

  return new Promise((resolve, reject) => {
    try {
      let queryString = `update users set sessionId = $1 where username = $2`;
      pool.query(queryString, [sessionId, userName], (err, res) => {
        if (err) {
          throw err;
        }
        resolve({ response: res, sessionId: sessionId });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteSession = (sessionId) => {
  return new Promise((resolve, reject) => {
    try {
      let queryString = `update users set sessionId = Null where sessionId = $1`;
      pool.query(queryString, [sessionId], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const validateSessionId = (sessionId) => {
  return new Promise((resolve, reject) => {
    try {
      let queryString = `select exists(select 1 from users  where sessionId = $1 )`;
      pool.query(queryString, [sessionId], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const insertPost = async (result) => {
  let postId = await uuidv4();
  let postTitle = result.postTitle;
  let postBody = result.postBody;

  return new Promise((resolve, reject) => {
    try {
      let queryString = `insert into posts (postId, postTitle, postBody) values ($1, $2, $3) RETURNING *`;
      pool.query(queryString, [postId, postTitle, postBody], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const editPostData = async (result) => {
  let postBody = result.postBody;
  let postId = result.postId;

  return new Promise((resolve, reject) => {
    try {
      let queryString = `update posts set postBody=$1 where postId = $2`;
      pool.query(queryString, [postBody, postId], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deletePostData = async (result) => {
  let postId = result.postId;
  return new Promise((resolve, reject) => {
    try {
      let queryString = `delete from posts where postId = $1`;
      pool.query(queryString, [postId], (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPost = async () => {
  return new Promise((resolve, reject) => {
    try {
      let queryString = `select * from posts`;
      pool.query(queryString, (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertUserData,
  createSession,
  deleteSession,
  validateUserData,
  insertPost,
  editPostData,
  deletePostData,
  validateSessionId,
  getAllPost,
};
