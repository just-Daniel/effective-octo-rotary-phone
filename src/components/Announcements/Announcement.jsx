import React from "react";
import moment from "moment";
import classes from './Announcement.module.css';

export const Announcement = ({announcement, ...props}) => {
    
    return (
        <div className={classes.AnnouncementItem}>
            <div className={classes.AnnouncementButtons}>
                <button className={classes.edit}>Edit</button>
                <button className={classes.delete}>Delete</button>
            </div>
            <div>
                <h3>{ announcement.id + ' ' + announcement.title }</h3>
                <p>{ announcement.body }</p>
            </div>
            <time>{ moment(announcement.updatedAt).startOf().fromNow() }</time>
        </div>
    )
}