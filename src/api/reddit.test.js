import reddit from './reddit';
import server from './test/server';
import { mockSubreddits, mockPosts, subredditsHandlerException, searchHandlerException } from './test/server-handlers';

describe('Reddit API', () => {
	describe('getTopSubreddits', () => {
		it('loads top subreddits', async () => {
			const subreddits = await reddit.getTopSubreddits();
			expect(subreddits.length).toEqual(mockSubreddits.data.children.length);
		});
	
		it('handles network error gracefully', async () => {
			server.use(subredditsHandlerException);
			const subreddits = await reddit.getTopSubreddits();
			expect(subreddits).toBe(null);
		});
	});

	describe('getPostsBySearchTerm', () => {
		it('gets posts by search term', async () => {
			const posts = await reddit.getPostsBySearchTerm('');
			expect(posts.length).toEqual(mockPosts.data.children.length);
		});
	
		it('handles network error gracefully', async () => {
			server.use(searchHandlerException);
			const subreddits = await reddit.getPostsBySearchTerm('');
			expect(subreddits).toBe(null);
		});
	});
});
