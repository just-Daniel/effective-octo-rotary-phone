import { announcementAPI } from "../api/api";
import { initCreateAnnouncement } from "./form-reducer";

const SET_ANNOUNCEMENTS = 'SET_ANNOUNCEMENTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    data: [],
    isFetching: false
}

export const announcementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ANNOUNCEMENTS: 
            return { ...state, data: action.payload };
        case TOGGLE_IS_FETCHING: 
            return { ...state, isFetching: action.payload }
        
        default: return state;
    }
}

const setAnnouncements = (data) => ({type: SET_ANNOUNCEMENTS, payload: data});
const toggleIsFetching = isFetching =>({type: TOGGLE_IS_FETCHING, payload: isFetching})

export const getAnnouncements = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const data = await announcementAPI.getLimitAnnouncements();

    console.log('data', data);
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
}