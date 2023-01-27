import MeetupList from "../../components/meetups/MeetupList";
import {useState,useEffect} from 'react';
import axios from "axios";
import axiosInstance from "../../helpers/AxiosHelpers";
import {KeycloackHelper} from "../../helpers/KeycloakHelper";
import { useNavigate } from "react-router-dom";


function AllMeetupsPage(){
  const [isLoading,setIsLoading] =useState(true);
  const [loadedMeetups,setLoadedMeetups] = useState([]);

  KeycloackHelper();

  useEffect(()=>{
    setIsLoading(true);
    axiosInstance.get("https://34.200.175.161:3001/api/meetupn"
    ).then((response)=>{
       return response.data;
    }).then(data => {
      const meetups=[];

      for(const key in data){
        const meetup={
          id:data[key]._id,
          ...data[key]
        };
        meetups.push(meetup);
      }

      setIsLoading(false);
      setLoadedMeetups(meetups);
    });
  },[]);

  if(isLoading){
    return (<section>
      <p>Loading....</p>
    </section>)
  }
  

    return <section>
        <h1>All Meetups</h1>
        <MeetupList meetups={loadedMeetups}/>
    </section>
}

export default AllMeetupsPage;