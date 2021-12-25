# Reddit Client

A simple Reddit client built with React and utilizing the [Reddit JSON API](https://github.com/reddit-archive/reddit/wiki/JSON).

## Blockframes

### Main page

![Reddit client blockframe](https://user-images.githubusercontent.com/19590575/147276368-6ba76115-7e99-4bf3-be18-4a0a738d92d1.jpeg)
The main page shows a header at the top which is sticky. The side panel containing the subreddits list is also sticky. The main content is the list of posts which scrolls.

### Main page (comments expanded)

![Reddit client blockframe (comments expanded)](https://user-images.githubusercontent.com/19590575/147276454-360344d7-9d42-4a95-9835-ad5523b4a941.jpeg)
When a post is clicked a list of its comments will be loaded and displayed below. The comments' contents, authors and ages will be shown.

### Mobile (subreddits collapsed)

![Reddit client mobile blockframe (Subreddits collapsed)](https://user-images.githubusercontent.com/19590575/147276538-e2bb119c-27c0-4dd7-9e52-3a006570e11f.jpeg)
On narrow screens the subreddits list will stack above the posts and will show a dropdown button to toggle the display state of the list. Also, padding around the post list and subreddit list will be minimized. The website title will not be visible in the header. The upvotes component will be smaller to consume less space.

### Mobile (subreddits expanded)

![Reddit client mobile blockframe (Subreddits expanded)](https://user-images.githubusercontent.com/19590575/147276687-e265ae8b-c280-4aee-a3b9-2cab9d969639.jpeg)

## Redux store

The app uses a redux store for its information. The slices are:

- Subreddits (A list of subreddits that populate the subreddits component on the right side of the main page)
	- Subreddit
		- Title
		- Icon
- Posts (A list of posts that populate the main section of the main page)
	- Post
		- Title
		- Main content (Image or text)
		- Author
		-	Age
		-	Number of comments
		- Number of upvotes
		- User has upvoted
		- User has downvoted
- Comments (A list of comments displayed under the currently selected post)
	- Comment
		- Text
		- Author
		- Age
- Search (The user input in the search bar at the top of the main page)
	- Search term

## Components

### App

Container for the entire app. Has three subcomponents:
1. Header
2. Subreddit List
3. Post List

### Header

Contains logo, website title and Search component. Is sticky (will maintain viewport position through scrolling).

### Search

Responsible for the Search slice. Contains a text search input and a search button.

Actions:
- Search

### Subreddit List

Populated by the Subreddits slice. Contains a list of Subreddit components. Is sticky (will maintain viewport position through scrolling).

### Subreddit

Contains a subreddit logo and title. When clicked, will filter the posts in App's Post List to show posts from this subreddit.

Actions:
- Click

### Post List

Populated by the Posts slice. Contains a list of Post components.

### Post

Contains the title and main content of a post, and an Upvotes component. Also contains the author's name, the age of the post, and a button which shows the number of comments. When this button is clicked a Comment List component is shown under the post which contains the post's comments.

Actions:
- Click

### Upvotes

Contains an upvote button and a downvote button. Displays the number of upvotes on the post.

Actions:
- Upvote
- Cancel upvote
- Downvote
- Cancel downvote

### Comment List

Populated by the Comments slice. Contains a list of Comment components. Visible when a post has been selected.

### Comment

Displays the content of a comment. Also displays the author and the age of the comment.
