import React from "react";
import { connect } from "react-redux";
import { getAnnouncements, submitCreateAnnouncement, onEditAnn, onDeleteAnn, submitEditAnnouncement } from "../../redux/announcement-reducer";
import Loader from "../../UI/Loader/Loader";
import Textarea from "../../UI/Textarea/Textarea";
import { Announcement } from "./Announcement";
import classes from './Announcement.module.css';
import { changeCreateBody, changeCreateTitle, showOnSavingCreateAnnError, showOnSavingEditAnnError, onInitEditAnn, changeEditBodyAnn, changeEditTitleAnn } from '../../redux/form-reducer';
import InputItem from "../../UI/Input/InputItem";

class AnnouncementContainer extends React.Component {
    constructor(props) {
        super(props);

        this.changeCreateBodyText = this.changeCreateBodyText.bind(this);
        this.changeCreateTitleText = this.changeCreateTitleText.bind(this);
        this.onEditClickAnnouncement = this.onEditClickAnnouncement.bind(this);
        this.submitEditAnnouncement = this.submitEditAnnouncement.bind(this);

        this.state = { 
            show: true,
            submittingCreatedAnn: false,
            submittingEditedAnn: false
        };
    }

    componentDidMount() {
        this.props.getAnnouncements();
    }


    changeCreateBodyText (data) {
        this.props.changeCreateBody(data, this.props.announcements);
    }
    changeCreateTitleText (data) {
        this.props.changeCreateTitle(data);
    }
    submitCreateAnnouncement (event) {
        event.preventDefault();
        
        if (!this.props.annCreateIsFormValid) {
            return this.props.showOnSavingCreateAnnError(true);
        }

        this.setState({submittingCreatedAnn: true});

        this.props.submitCreateAnnouncement(
            this.props.annCreateTitle.value,
            this.props.annCreateBody.value,
            this.props.userId
        ).finally(() => {
            this.setState({submittingCreatedAnn: false});
        })
    }

    onEditClickAnnouncement (ann) {
        this.props.onEditAnn(ann.id);
        this.props.onInitEditAnn(ann);
    }

    submitEditAnnouncement (event, annId) {
        event.preventDefault();
        
        if (!this.props.annEditIsFormValid) {
            return this.props.showOnSavingEditAnnError(true);
        }

        this.setState({submittingEditedAnn: true});

        this.props.submitEditAnnouncement(
            this.props.annEditTitle.value,
            this.props.annEditBody.value,
            annId
        ).finally(() => {
            this.setState({submittingEditedAnn: false});
        })
    }

    render() {
        return (
            <>
                {
                    this.props.isFetching ? <Loader />
                    : 
                    <div className={classes.AnnouncementContainer}>
                        <h1>Announcements</h1>
                        {
                            this.props.isAuth &&
                            <div className={classes.CreateAnnouncement}>
                                {
                                    this.state.show
                                    ? <button onClick={() => this.setState({show: !this.state.show})}>Create</button>
                                    : <>
                                        <button
                                            onClick={() => this.setState({show: !this.state.show})} 
                                        >Close</button>
                                        <form>
                                            <InputItem
                                                input={ this.props.annCreateTitle }
                                                changeInputElement={ this.changeCreateTitleText }
                                            />
                                            <Textarea
                                                formText={ this.props.annCreateBody }
                                                changeTextHandler={ this.changeCreateBodyText }
                                            />
                                            {
                                                this.props.showOnSaveCreateError &&
                                                <div className={classes.error}>Please enter correct value!</div>
                                            }
                                            <button
                                                onClick={ event => this.submitCreateAnnouncement(event) }
                                                disabled={ this.state.submittingCreatedAnn }
                                            >Submit</button>
                                        </form>
                                    </>
                                }
                                
                            </div>
                        }
                        <div className={classes.AnnouncementsItems}>
                            {
                                this.props.announcements.map(announcement => {
                                    return (
                                        <Announcement
                                            key={ announcement.id }
                                            announcement={ announcement }
                                            isAuth={ this.props.isAuth }
                                            userId={ this.props.userId }

                                            onEditClickAnn={ this.onEditClickAnnouncement }
                                            onEditAnn={ this.props.onEditAnn }
                                            isEditing={ this.props.isEditing }
                                            annEditTitle={ this.props.annEditTitle }
                                            annEditBody={ this.props.annEditBody }
                                            changeEditTitleAnn={ this.props.changeEditTitleAnn }
                                            changeEditBodyAnn={ this.props.changeEditBodyAnn }
                                            submitEditAnnouncement={ this.submitEditAnnouncement }
                                            submittingEditedAnn={ this.state.submittingEditedAnn }
                                            onDeleteAnn={ this.props.onDeleteAnn }
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementContainer)