import Card from "../UI/Card";
import classes from './NewMeetupForm.module.css';
import {useRef} from 'react';


function NewMeetupForm(props){
    const titleInputRef=useRef();
    const addressInputRef=useRef();
    const imageInputRef=useRef();
    const descriptionInputRef=useRef();

    function submitHandler(event){
        event.preventDefault();

        const enteredTitle=titleInputRef.current.value;
        const enteredAddress=addressInputRef.current.value;
        const enteredImage=imageInputRef.current.value;
        const enteredDescription=descriptionInputRef.current.value;

        const meetupData={
            address:enteredAddress,
            title:enteredTitle,
            image:enteredImage,
            description:enteredDescription,
        };
        props.onAddMeetup(meetupData);
    
    }

return (
    <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Meetup title</label>
                <input type='text' required id='title'  ref={titleInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='image'>Meetup image</label>
                <input type='url' required id='image' ref={imageInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='address'>Address</label>
                <input type='text' required id='address' ref={addressInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='description'>Description</label>
                <textarea id="description" required rows='5' ref={descriptionInputRef}></textarea>
                <div className={classes.actions}>
                    <button>Add Meetup</button>
                </div>
            </div>
        </form>
    </Card>
);

}

export default NewMeetupForm;