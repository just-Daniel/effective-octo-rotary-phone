import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAnnouncements, submitCreateAnnouncement, onEditAnn, onDeleteAnn, submitEditAnnouncement } from "../../redux/announcement-reducer";
import Loader from "../../UI/Loader/Loader";
import Textarea from "../../UI/Textarea/Textarea";
import InputItem from "../../UI/Input/InputItem";
import { AnnouncementItem } from "../../components/Announcements/Announcement";
import classes from '../../components/Announcements/Announcement.module.css';
import { changeCreateBody, changeCreateTitle, showOnSavingCreateAnnError, showOnSavingEditAnnError, onInitEditAnn, changeEditBodyAnn, changeEditTitleAnn } from '../../redux/form-reducer';

const useInit = callback => {
    const [mounted, setMounted] = useState(false);
    const resetInit = () => setMounted(false);
    
    useEffect(() => callback(), [mounted, callback]);
    
    return resetInit;
}

const Announcement = props => {

    const [show, setShow] = useState(true);
    const [submittingCreatedAnn, setSubmittingCreatedAnn] = useState(false);
    const [submittingEditedAnn, setSubmittingEditedAnn] = useState(false);

    const resetInit = useInit(props.getAnnouncements);
    
    useEffect(() => {
      resetInit()
    }, [resetInit]);

    const changeCreateBodyText = (data) => {
        props.changeCreateBody(data, props.announcements);
    }
    const changeCreateTitleText = (data) => {
        props.changeCreateTitle(data);
    }
    const submitCreateAnnouncement = (event) => {
        event.preventDefault();
        
        if (!props.annCreateIsFormValid) {
            return props.showOnSavingCreateAnnError(true);
        }

        setSubmittingCreatedAnn(true);

        props.submitCreateAnnouncement(
            props.annCreateTitle.value,
            props.annCreateBody.value,
            props.userId
        ).finally(() => setSubmittingCreatedAnn(false));
    }

    const onEditClickAnnouncement = (ann) => {
        props.onEditAnn(ann.id);
        props.onInitEditAnn(ann);
    }

    const submitEditAnnouncement = (event, annId) => {
        event.preventDefault();
        
        if (!props.annEditIsFormValid) {
            return props.showOnSavingEditAnnError(true);
        }

        setSubmittingEditedAnn(true);

        props.submitEditAnnouncement(
            props.annEditTitle.value,
            props.annEditBody.value,
            annId
        ).finally(() => setSubmittingEditedAnn(false));
    }

    
    return (
        <>
            {
                props.isFetching ? <Loader />
                : 
                <div className={classes.AnnouncementContainer}>
                    <h1>Announcements</h1>
                    {
                        props.isAuth &&
                        <div className={classes.CreateAnnouncement}>
                            {
                                show
                                ? <button onClick={() => setShow(!show) }>Create</button>
                                : <>
                                    <button
                                        onClick={() => setShow(!show) }  
                                    >Close</button>
                                    <form>
                                        <InputItem
                                            input={ props.annCreateTitle }
                                            changeInputElement={ changeCreateTitleText }
                                        />
                                        <Textarea
                                            formText={ props.annCreateBody }
                                            changeTextHandler={ changeCreateBodyText }
                                        />
                                        {
                                            props.showOnSaveCreateError &&
                                            <div className={classes.error}>Please enter correct value!</div>
                                        }
                                        <button
                                            onClick={ event => submitCreateAnnouncement(event) }
                                            disabled={ submittingCreatedAnn }
                                        >Submit</button>
                                    </form>
                                </>
                            }
                            
                        </div>
                    }
                    <div className={classes.AnnouncementsItems}>
                        {
                            props.announcements.map(announcement => {
                                return (
                                    <AnnouncementItem
                                        key={ announcement.id }
                                        announcement={ announcement }
                                        isAuth={ props.isAuth }
                                        userId={ props.userId }

                                        onEditClickAnn={ onEditClickAnnouncement }
                                        onEditAnn={ props.onEditAnn }
                                        isEditing={ props.isEditing }
                                        annEditTitle={ props.annEditTitle }
                                        annEditBody={ props.annEditBody }
                                        changeEditTitleAnn={ props.changeEditTitleAnn }
                                        changeEditBodyAnn={ props.changeEditBodyAnn }
                                        submitEditAnnouncement={ submitEditAnnouncement }
                                        submittingEditedAnn={ submittingEditedAnn }
                                        onDeleteAnn={ props.onDeleteAnn }
                                    />
                                )   
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
    
    
}

const mapStateToProps = state => ({
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
    isFetching: state.announcements.isFetching,
    announcements: state.announcements.data,
    isEditing: state.announcements.isEditing,
    annCreateForm: state.form.announcement,
    annCreateBody: state.form.announcement.body,
    annCreateTitle: state.form.announcement.title,
    annCreateIsFormValid: state.form.announcement.isFormValid,
    showOnSaveCreateError: state.form.announcement.showOnSaveError,
    annEditTitle: state.form.announcementEdit.title,
    annEditBody: state.form.announcementEdit.body,
    annEditIsFormValid: state.form.announcementEdit.isFormValid
});

const mapDispatchToProps = {
    getAnnouncements,
    changeCreateBody,
    changeCreateTitle,
    showOnSavingCreateAnnError,
    submitCreateAnnouncement,
    onInitEditAnn,
    onEditAnn,
    changeEditBodyAnn,
    changeEditTitleAnn,
    showOnSavingEditAnnError,
    submitEditAnnouncement,
    onDeleteAnn
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);