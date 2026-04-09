import { fetchCommentsAction, postCommentAction } from '../api-actions';
import { commentsReducer, setComment, setRating } from './comments-slice';

describe('CommentsSlice', () => {
  it('should return current state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: 'Some test comment',
      rating: 1,
    };

    const result = commentsReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set comment', () => {
    const state = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: 'Hello, world',
      rating: null,
    };

    const result = commentsReducer(state, setComment('Hello, world'));

    expect(result.postingComment).toBe('Hello, world');
  });

  it('should set rating', () => {
    const state = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(state, setRating(1));

    expect(result.rating).toBe(1);
  });

  it('should set "isCommentsLoading" to "true" with "fetchCommentsAction.pending"', () => {
    const expectedState = {
      comments: [],
      isCommentsLoading: true,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(undefined, fetchCommentsAction.pending('', '0012'));

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to "false", "comments" to array with comments with "fetchCommentsAction.fulfilled"', () => {
    const mockComments = [
      {
        id: '12',
        date: '21.04.1987',
        user: {
          name: 'Ser',
          avatarUrl: 'url/21288',
          isPro: false,
        },
        comment: 'Hello, world',
        rating: 5,
      },
    ];
    const expectedState = {
      comments: mockComments,
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(
      undefined,
      fetchCommentsAction.fulfilled(mockComments, '', '0012'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to "false" with "fetchCommentsAction.rejected"', () => {
    const expectedState = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(undefined, fetchCommentsAction.rejected(null, '', '12'));

    expect(result).toEqual(expectedState);
  });

  it('should set "isPostingComment" to "true" with "postCommentAction.pending"', () => {
    const expectedState = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: true,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(undefined, postCommentAction.pending('', {
      offerId: '12',
      rating: 5,
      comment: 'Hello world',
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "isPostingComment" to "false", postingComment to "", rating to null with "postCommentAction.fulfilled"', () => {
    const expectedState = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(undefined, postCommentAction.fulfilled(
      undefined,
      '',
      {
        offerId: '12',
        rating: 5,
        comment: 'Hello world'
      }
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set "isPostingComment" to "false" with "postCommentAction.rejected"', () => {
    const expectedState = {
      comments: [],
      isCommentsLoading: false,
      isPostingComment: false,
      postingComment: '',
      rating: null,
    };

    const result = commentsReducer(undefined, postCommentAction.rejected(
      null,
      '',
      {
        offerId: '12',
        rating: 5,
        comment: 'Hello world'
      }
    ));

    expect(result).toEqual(expectedState);
  });
});
