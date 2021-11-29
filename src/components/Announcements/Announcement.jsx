import React from "react";

export const Announcement = props => {
    
    return (
        <div>
            <h1>Announcements</h1>
            {
                props.announcements.map(annunce => {
                    return (
                        <div key={annunce.id}>
                            <h3>{ annunce.title }</h3>
                            <p>{ annunce.body }</p>
                        </div>
                    ) 
                })
            }
        </div>
    )
}