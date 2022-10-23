const messageDb = require("./Models");
const cookie = require("cookie");


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



const signupUser = async (result, res) => {
  const data = await messageDb.insertUserData(result);
  if (data.rowCount == 1) {
    res.statusCode = 201;
    res.write(
      JSON.stringify({ message: "User has been created successfully" })
    );
    res.end();
  } else {
    res.statusCode = 400;
    res.write(JSON.stringify({ message: "User cannot able to be created" }));
    res.end();
  }
};

const loginUser = async (result, res, req) => {
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

    res.statusCode = 200;
    res.write(
      JSON.stringify({ message: "User has been successfully authencticated" })
    );
    res.end();
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User Not found. Login or Signup" }));
    res.end();
  }
};

const logoutUser = async (req, res) => {
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
      res.statusCode = 200;
      res.write(JSON.stringify({ message: "Logging out" }));
      res.end();
    } else {
      res.statusCode = 400;
      res.write(JSON.stringify({ message: "Login or Sign up to logout" }));
      res.end();
    }
  }
};


module.exports = {
    getUserData,
    signupUser,
    loginUser,
    logoutUser

}
