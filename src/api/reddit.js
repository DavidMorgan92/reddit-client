const routes = {
	popularSubreddits: 'https://www.reddit.com/subreddits.json',
};

const reddit = {
	async getTopSubreddits() {
		const response = await fetch(routes.popularSubreddits);
		const json = await response.json();
		return json.data.children.map(child => ({
			id: child.data.id,
			icon: child.data.icon_img,
			name: child.data.display_name,
		}));
	},
};

export default reddit;
