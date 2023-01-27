import {useContext, useState} from 'react';
import FavoritesContext from '../../store/favorite-context';
import MeetupList from '../../components/meetups/MeetupList';
import {useEffect} from 'react';
import axios from "axios";
import axiosInstance from '../../helpers/AxiosHelpers';
//import MeetupItem from '../../components/meetups/MeetupItem';

function FavoritesPage(){
    const favoriteContext=useContext(FavoritesContext);

    const [meetupsFav, setMeetupsFav] = useState([]);

    var meetups = [];

    function upload(){
        for(const key of favoriteContext.favorites){
            axiosInstance.get(`https://34.200.175.161:3001/api/meetupn/${key[0]}`
            ).then((response)=>{
               return response.data;
            }).then(data => {
                const meetup={
                  id:data._id,
                  ...data
                };
                meetups.push(meetup);
            });
        }
    }

    upload();

    useEffect(()=>{
        const timer = setInterval(() => {
            setMeetupsFav(meetups);
        },5000);
        return() => {
        clearInterval(timer);
        };
    },[]);



    if(favoriteContext.totalFavorites === 0){
        <section>
            <p>No Favorites</p>
        </section>
    };


    return (
        <section>
        <h1>My Favorites</h1>
        <MeetupList meetups={meetupsFav}/>
        </section>
    );
}

export default FavoritesPage;