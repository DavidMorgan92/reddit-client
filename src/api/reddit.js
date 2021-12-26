const routes = {
	popularSubreddits: () => 'https://www.reddit.com/subreddits.json',
	comments: postId => `https://www.reddit.com/comments/${postId}.json`,
	posts: (subredditName, searchTerm) => {
		let url = 'https://www.reddit.com';

		if (subredditName) {
			url += `/r/${subredditName}`;

			if (searchTerm) {
				url += `/search.json?q=${searchTerm}&restrict_sr=1`;
			} else {
				url += '.json';
			}
		} else {
			if (searchTerm) {
				url += `/search.json?q=${searchTerm}`;
			} else {
				url += '/hot.json';
			}
		}

		return url;
	},
};

const reddit = {
	async getTopSubreddits() {
		const response = await fetch(routes.popularSubreddits());
		const json = await response.json();
		return json.data.children.map(child => ({
			id: child.data.id,
			icon: child.data.icon_img,
			name: child.data.display_name,
		}));
	},

	async getPosts(subredditName, searchTerm) {
		const response = await fetch(routes.posts(subredditName, searchTerm));
		const json = await response.json();
		return json.data.children.map(child => ({
			id: child.data.id,
			title: child.data.title,
			content: '',
			author: child.data.author,
			age: '',
			numComments: child.data.num_comments,
			upvotes: child.data.score,
			userUpvoted: false,
			userDownvoted: false,
		}));
	},

	async getComments(postId) {
		const response = await fetch(routes.comments(postId));
		const json = await response.json();
		return json[1].data.children.map(child => ({
			text: child.data.body,
			author: child.data.author,
			age: '',
		}));
	},
};

export default reddit;
