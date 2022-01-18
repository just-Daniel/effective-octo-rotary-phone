const CHANGE_ACTIVE_IMG = 'CHANGE_ACTIVE_IMG';

const initialState = {
    images: [
        { link: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png', alt: 'avatar', active: true },
        { link: 'https://cdn.pixabay.com/photo/2020/11/17/13/22/student-5752322_960_720.png', alt: 'avatar', active: false },
        { link: 'https://cdn.pixabay.com/photo/2021/01/21/16/17/human-5937759_960_720.jpg', alt: 'avatar', active: false },
        { link: 'https://cdn.pixabay.com/photo/2016/11/01/21/11/avatar-1789663_960_720.png', alt: 'avatar', active: false },
        { link: 'https://cdn.pixabay.com/photo/2020/08/14/09/12/penguin-5487301_960_720.png', alt: 'avatar', active: false },
        { link: 'https://cdn.pixabay.com/photo/2020/08/14/17/22/mask-5488606_960_720.png', alt: 'avatar', active: false },
    ],
    isActiveImg: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png'
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_IMG: {
            const activeItem = action.payload.find(i => i.active === true);
           
            return {
                ...state,
                images: [...action.payload],
                isActiveImg: activeItem.link
            }
        }

        default: return { ...state }
    }
}

export const changeActiveImg = (items) => ({type: CHANGE_ACTIVE_IMG, payload: items});