const routes = {
	popularSubreddits: () => 'https://www.reddit.com/subreddits.json',
	postsBySearchTerm: (searchTerm) => `https://www.reddit.com/search.json?q=${searchTerm}`,
};

const reddit = {
	async getTopSubreddits() {
		try {
			const response = await fetch(routes.popularSubreddits());
			const json = await response.json();
			return json.data.children.map(child => ({
				id: child.data.id,
				icon: child.data.icon_img,
				name: child.data.display_name,
			}));
		} catch (error) {
			return null;
		}
	},

	async getPostsBySearchTerm(searchTerm) {
		try {
			const response = await fetch(routes.postsBySearchTerm(searchTerm));
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
		} catch (error) {
			return null;
		}
	},
};

export default reddit;
