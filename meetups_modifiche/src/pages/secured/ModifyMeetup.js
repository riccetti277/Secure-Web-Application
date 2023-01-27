import axiosInstance from '../../helpers/AxiosHelpers';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import ModifyMeetupForm from "../../components/meetups/ModifyMeetupForm";
import {useLocation} from 'react-router-dom';


function ModifyMeetupPage(){
   const location=useLocation();
   let navigate= useNavigate();
   const meetupelem=location.state;
    function modifyMeetupHandler(meetupData){
           axiosInstance.put(`https://34.200.175.161:3001/api/meetupn/${meetupData.id}`,meetupData
           ).then(()=> {
                alert("Meetup modify successfully");
                navigate('/',{replace:true});
            }).catch(function (error) {
                console.log(error);
              });
    }

    return (<section>
        <h1>Modify Meetup</h1>
        <ModifyMeetupForm onModifyMeetup={modifyMeetupHandler}>{meetupelem}</ModifyMeetupForm>
        
    </section>

    );
}

export default ModifyMeetupPage;