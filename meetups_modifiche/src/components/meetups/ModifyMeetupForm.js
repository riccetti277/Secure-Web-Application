import Card from "../UI/Card";
import classes from './NewMeetupForm.module.css';
import {useRef} from 'react';

function ModifyMeetupForm(props){
    
    const addressInputRef=useRef();
    const imageInputRef=useRef();
    const descriptionInputRef=useRef();
    function submitHandler(event){
        event.preventDefault();

       
        const enteredAddress=addressInputRef.current.value;
        const enteredImage=imageInputRef.current.value;
        const enteredDescription=descriptionInputRef.current.value;

        const meetupData={
            id:props.children.id,
            title:props.children.title,
            address:enteredAddress,
            image:enteredImage,
            description:enteredDescription,
        };
        props.onModifyMeetup(meetupData);
        
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Città (Impossibile modificare): {props.children.title}</label>
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
                        <button>Modify Meetup</button>
                    </div>
                </div>
            </form>
        </Card>
    );
    
    }
    
    export default ModifyMeetupForm;