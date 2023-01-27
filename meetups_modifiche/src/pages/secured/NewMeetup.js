import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import axiosInstance from '../../helpers/AxiosHelpers';


function NewMeetupPage(){
   let navigate= useNavigate();

    function addMeetupHandler(meetupData){
           axiosInstance.post("https://34.200.175.161:3001/api/meetupn",meetupData
           ).then(()=> {
                alert("Meetup created successfully");
                navigate('/',{replace:true});
            }).catch(function (error) {
                console.log(error);
              });
    }

    return (<section>
        <h1>Add new Meetup</h1>
        <NewMeetupForm  onAddMeetup={addMeetupHandler}/>
    </section>

    );
}

export default NewMeetupPage;