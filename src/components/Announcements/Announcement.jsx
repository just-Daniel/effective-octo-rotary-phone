import React from "react";
import moment from "moment";
import classes from './Announcement.module.css';
import Textarea from "../../UI/Textarea/Textarea";

export const Announcement = ({announcement, ...props}) => {

    return (
        <div className={classes.AnnouncementItem}>
            
                {
                    props.isAuth &&
                    (props.userId === announcement.userId) &&
                    <div className={classes.AnnouncementButtons}>
                        <button 
                            className={classes.edit}
                            onClick={ () => props.onEditClickAnn(announcement) }
                        >Edit</button>
                        <button 
                            className={classes.delete}
                            onClick={ () => props.onDeleteAnn(announcement.id) }
                        >Delete</button>
                    </div>
                }
            {
             !(props.isEditing === announcement.id)
             ? <>
                <div>
                    <h3>{ announcement.title }</h3>
                    <p>{ announcement.body }</p>
                </div>
                <time>{ moment(announcement.updatedAt).startOf().fromNow() }</time>
              </>
            : <form>
                <Textarea
                    formText={ props.annEditTitle }
                    changeTextHandler={ props.changeEditTitleAnn }
                />
                <Textarea
                    formText={ props.annEditBody }
                    changeTextHandler={ props.changeEditBodyAnn }
                />
                {
                    props.showOnSaveCreateError &&
                    <div className={classes.error}>Please enter correct value!</div>
                }
                <div>
                    <button
                        className={classes.submit}
                        onClick={ event => props.submitEditAnnouncement(event, announcement.id) }
                        disabled={ props.submittingEditedAnn }
                    >Submit</button>
                    <button
                        className={classes.cancel}
                        onClick={ () => props.onEditAnn(null) }
                    >Cancel</button>
                </div>
                
            </form>
            }
        </div>
    )
}