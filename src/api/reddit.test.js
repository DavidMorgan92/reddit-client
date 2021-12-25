import reddit from './reddit';
import { mockSubreddits } from './test/server-handlers.js';

describe('Reddit API', () => {
	it('loads top subreddits', async () => {
		const subreddits = await reddit.getTopSubreddits();
		expect(subreddits.length).toEqual(mockSubreddits.data.children.length);
	});
});
