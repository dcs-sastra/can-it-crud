# Can-It-CRUD

So we figured it'd be a good exercise for us to try and implement a basic, common CRUD app in multiple languages and frameworks. We decided to implement a simple message-board app's backend for this exercise. The app features a login/signup endpoint, CRUD operations on a post, search operation and reply operations. These basic features **must be implemented** in every framework. Extra features can be added as well.

## Languages and Frameworks Implemented:

[] Python (FastAPI)
[] Elixir Phoenix
[] Rust Rocket

# API Specifications:
### Sign-Up Endpoint
- Signs up a new user to the platform, and adds their credentials to the database.

### Login Endpoint
- Validates a given username-password pair and allows them to use endpoints that require the same through sessions.

### Logout Endpoint
- Deletes user's current session id and logs them out of the application.

### Create Post
- Allows a logged-in user to create a post on the message board with a Title and Body. Each created post must be alloted a unique post ID to identify the same.

### Edit Post
- Allows the creator of the post to edit the body of the post.

### Delete Post
- Allows the creater of a post to delete the same.

### Get Post
- Fetches a post by its ID to display on website. User need not be logged in for this.

### Get Feed
- Fetches 'n' posts from the database either randomly or in chronological order. User need not be logged in for this.

### Search Post
- Search for word / phrase in either both post bodies and titles, and returns relevant posts to the user. Log in access not required.

### Reply to Post
- Allows for a signed-in user to reply to a post made by another user.
