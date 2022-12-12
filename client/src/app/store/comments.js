import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecived,
    commentsRequestedFailed,
    commentCreated,
    commentRemoved
} = actions;

const createRequested = createAction("comments/createRequested");
const createFailed = createAction("comments/createRequested");
const removeRequested = createAction("comments/removeRequested");
const removeFailed = createAction("comments/removeFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecived(content));
    } catch (error) {
        dispatch(commentsRequestedFailed(error.message));
    }
};

export const createComment = (comment) => async (dispatch) => {
    dispatch(createRequested());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createFailed(error.message));
    }
};
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (!content) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(removeFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.isLoading;

export default commentsReducer;
