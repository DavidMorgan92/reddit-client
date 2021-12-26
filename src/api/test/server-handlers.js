import { rest } from 'msw';

export const mockSubreddits = {
	data: {
		children: [
			{
				data: {
					id: 'id1',
					name: 'subreddit1',
					icon: ''
				}
			},
			{
				data: {
					id: 'id2',
					name: 'subreddit2',
					icon: ''
				}
			},
			{
				data: {
					id: 'id3',
					name: 'subreddit3',
					icon: ''
				}
			},
		]
	}
};

export const mockPosts = {
	data: {
		children: [
			{
				data: {
					id: 'id1',
					title: 'Title1',
					author: 'Author1',
					num_comments: 24,
					score: 145
				}
			}
		]
	}
};

const subredditsHandler = rest.get('https://www.reddit.com/subreddits.json', async (req, res, ctx) => {
	return res(ctx.json(mockSubreddits));
});

export const subredditsHandlerException = rest.get('https://www.reddit.com/subreddits.json', async (req, res, ctx) => {
	return res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }));
});

const searchHandler = rest.get('https://www.reddit.com/search.json', async (req, res, ctx) => {
	return res(ctx.json(mockPosts));
});

export const searchHandlerException = rest.get('https://www.reddit.com/search.json', async (req, res, ctx) => {
	return res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }));
});

export const handlers = [
	subredditsHandler,
	searchHandler,
];
