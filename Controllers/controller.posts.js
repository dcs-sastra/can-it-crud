const messageDb = require("./Models");
const cookie = require("cookie");


const createPost = async (result, res) => {
  const r = await messageDb.insertPost(result);
  if (r.rowCount == 1) {
    res.statusCode = 200;
    res.write(
      JSON.stringify({ message: "Post has been created successfully" })
    );
    res.end();
  } else {
    res.statusCode = 400;
    res.write(JSON.stringify({ message: "Post cannot able to be created" }));
    res.end();
  }
};

const editPost = async (result, res) => {
  const r = await messageDb.editPostData(result);
  if (data.rowCount == 1) {
    res.statusCode = 200;
    res.write(JSON.stringify({ message: "Post has been edited successfully" }));
    res.end();
  } else {
    res.statusCode = 400;
    res.write(JSON.stringify({ message: "Post cannot be found" }));
    res.end();
  }
};
const deletePost = async (result, res) => {
  const r = await messageDb.deletePostData(result);
  if (data.rowCount == 1) {
    res.statusCode = 200;
    res.write(
      JSON.stringify({ message: "Post has been deleted successfully" })
    );
    res.end();
  } else {
    res.statusCode = 400;
    res.write(JSON.stringify({ message: "Post cannot be found" }));
    res.end();
  }
};


const getFeed = async(res) => {
    const feed = await messageDb.getAllPost();
    let allposts = [];
    console.log(feed.rows[0]);
    feed.rows.forEach(function(posts){
	
	console.log(posts)
	allposts.push(posts);

    })
    console.log(allposts)
    res.write(JSON.stringify((allposts)))
    res.statusCode=200;
    res.end();
}

const isSession = async (req, res) => {
  if (!(isCookiePresent(req))) {
      res.statusCode=400;
      res.write(JSON.stringify({message: "Unaccessable endpoint. Login or Singup to access it."}));
      res.end();
  }else{
    var cookies = cookie.parse(req.headers.cookie || "");
    let sessionId = cookies.sessionId;
    const session = await messageDb.validateSessionId(sessionId);
    return session.rows[0].exists
}};

const isCookiePresent = (req) => {
  var cookies = cookie.parse(req.headers.cookie || "");
  if (cookies && cookies.sessionId) {
    return true;
  }
};
module.exports = {
  createPost,
  editPost,
  deletePost,
    getFeed,
};



