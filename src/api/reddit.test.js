import reddit from './reddit';
import { mockSubreddits, mockPosts } from './test/server-handlers';

describe('Reddit API', () => {
	it('loads top subreddits', async () => {
		const subreddits = await reddit.getTopSubreddits();
		expect(subreddits.length).toEqual(mockSubreddits.data.children.length);
	});

	it('gets posts by search term', async () => {
		const posts = await reddit.getPostsBySearchTerm('');
		expect(posts.length).toEqual(mockPosts.data.children.length);
	});
});
