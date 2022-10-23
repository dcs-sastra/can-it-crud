const messageDb = require("./Models");
const cookie = require("cookie");
const resp = require("./resp");
// Gets the user Data chunk by chunk

const getUserData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        resolve(JSON.parse(body.toString()));
      });
    } catch (error) {
      reject(error);
    }
  });
};

//Insert the username and password into the database. If the row is affected user has been successfully created.
//else user cannot be created.
const signupUser = async (result, res) => {
  const data = await messageDb.insertUserData(result);
  if (data.rowCount == 1) {
    let msg = "User has been created successfully";
    resp.succesfullResponse(res, msg);
  } else {
    let msg = "User cannot be created";
    resp.notFound(res, msg);
  }
};

// Checks the username is present in the database.It will check the presence with boolean value of exists. If yes it will create a session by calling createSession which will store sessionId and username,password in the json format.

const loginUser = async (result, res, req) => {
  console.time("blocking-await");
  const r = await messageDb.validateUserData(result);

  if (r.rows[0].exists == true) {
    if (!isCookiePresent(req)) {
      const r = await messageDb.createSession(result);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("sessionId", r.sessionId, {
          httpOnly: true,
          maxAge: 60,
        })
      );
    }
    let msg = "User has been successfully authencticated";
    resp.succesfullResponse(res, msg);
  } else {
    let msg = "User Not found. Login or Signup";
    resp.notFound(res, msg);
  }
  console.timeEnd("blocking-await");
};

const logoutUser = async (req, res) => {
  console.time("blocking-await");
  if (isCookiePresent(req)) {
    var cookies = cookie.parse(req.headers.cookie || "");
    var sessionId = cookies.sessionId;
    let r = await messageDb.deleteSession(sessionId);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("sessionId", "", {
        httpOnly: true,
        maxAge: 0,
      })
    );

    if (r.rowCount == 1) {
      let msg = "Logging out";
      resp.succesfullResponse(res, msg);
    } else {
      let msg = "Login or Sign up to logout";
      resp.notFound(res, msg);
    }
  }
};

const createPost = async (result, res) => {
  const r = await messageDb.insertPost(result);
  if (r.rowCount == 1) {
    let msg = "Post has been created successfully";
    resp.succesfullResponse(res, msg);
  } else {
    let msg = "Post cannot able to be created";
    resp.notFound;
  }
};

const editPost = async (result, res) => {
  const r = await messageDb.editPostData(result);
  if (r.rowCount == 1) {
    let msg = "Post has been edited successfully";
    resp.succesfullResponse(res, msg);
  } else {
    let msg = "Post cannot be found";
    resp.notFound(res, msg);
  }
};
const deletePost = async (result, res) => {
  const r = await messageDb.deletePostData(result);
  if (data.rowCount == 1) {
    let msg = "Post has been deleted successfully";
    resp.succesfullResponse(res, msg);
  } else {
    let msg = "Post cannot be found";
    resp.notFound(res, msg);
  }
};

const getFeed = async (res) => {
  const feed = await messageDb.getAllPost();
  let allposts = [];
  feed.rows.forEach(function (posts) {
    allposts.push(posts);
  });
  resp.returnAllPost(res, allposts);
};

const replyPost = async (result, req, res) => {
  const r = await messageDb.replyPostData(result);
};
const isSession = async (req, res) => {
  if (!isCookiePresent(req)) {
    let msg = "Unaccessable endpoint. Login or Singup to access it.";
    resp.unauthorized(res, msg);
  } else {
    var cookies = cookie.parse(req.headers.cookie || "");
    let sessionId = cookies.sessionId;
    const session = await messageDb.validateSessionId(sessionId);
    return session.rows[0].exists;
  }
};

const isCookiePresent = (req) => {
  var cookies = cookie.parse(req.headers.cookie || "");
  if (cookies && cookies.sessionId) {
    return true;
  }
};
module.exports = {
  getUserData,
  signupUser,
  loginUser,
  logoutUser,
  createPost,
  editPost,
  deletePost,
  isSession,
  getFeed,
  replyPost,
};
