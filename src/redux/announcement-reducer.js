import { announcementAPI } from "../api/api";
import { initCreateAnnouncement } from "./form-reducer";

const SET_ANNOUNCEMENTS = 'SET_ANNOUNCEMENTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ON_EDIT_ANN = 'ON_EDIT_ANN';

const initialState = {
    data: [],
    isFetching: false,
    isEditing: null
}

export const announcementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ANNOUNCEMENTS: 
            return { ...state, data: action.payload };
        case TOGGLE_IS_FETCHING: 
            return { ...state, isFetching: action.payload }
        case ON_EDIT_ANN: 
            return { 
                ...state, 
                isEditing: (action.payload === state.isEditing) 
                    ? null : action.payload
            }
        

        default: return state;
    }
}

const setAnnouncements = (data) => ({type: SET_ANNOUNCEMENTS, payload: data});
const toggleIsFetching = isFetching =>({type: TOGGLE_IS_FETCHING, payload: isFetching})

export const getAnnouncements = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const data = await announcementAPI.getLimitAnnouncements(100);

    dispatch(setAnnouncements(data));
    dispatch(toggleIsFetching(false));
}

export const submitCreateAnnouncement = (title, body, userId) => async dispatch => {
    const createdDate = new Date().toISOString();
    const ann = {
        createdAt: createdDate,
        updatedAt: createdDate,
        title,
        body,
        userId
    }

    await announcementAPI.submitAnnouncement(ann);
    dispatch(initCreateAnnouncement());
    dispatch(getAnnouncements());
}

export const onEditAnn = annId => ({
    type: ON_EDIT_ANN, payload: annId
})

export const submitEditAnnouncement = (title, body, annId) => async dispatch => {
    const updatedAt = new Date().toISOString();
    const ann = { updatedAt, title, body };

    await announcementAPI.updateAnnouncement(annId, ann);
    dispatch(getAnnouncements());
    dispatch(onEditAnn(null));
}

export const onDeleteAnn = annId => async dispatch => {
    await announcementAPI.deleteAnnouncement(annId);

    dispatch(getAnnouncements());
}