import axios from "axios";
import  axiosInstance  from "../helpers/AxiosHelpers";
import { createContext } from "react";
import {useState,useEffect} from 'react';



const FavoritesContext=createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup) =>{},
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId)=>{}
});

export function FavoritesContextProvider(props){
    const [userFavorites,setUserFavorites]=useState(0);
    const [idUser,setIdUser]=useState(0);
    const [id_favortites,setIdFavorites]=useState([]);


   function InitFavHandler(loadedus){
    useEffect(()=>{
        if(!loadedus.length){
            return null;
        }else{
        axiosInstance.get("https://34.200.175.161:3001/api/user/",{params:{name_user:loadedus}}
        ).then((response)=>{
            return response.data;
        }).then(data =>{

                if(data.length){
                const user_id = data[0]._id;
                const id_fav=data[0].id_meetup_fav;
 
                setIdFavorites(id_fav);
                setUserFavorites(loadedus);
                setIdUser(user_id);
                }else{
                    setUserFavorites(loadedus);
                    return null;
                }

        })
        }
    },[loadedus]);
   }

    
    function addFavoriteHandler(favoriteMeetup){
            if(userFavorites===0){
                console.log("ciao");
                return null;
            }else{
            axiosInstance.post("https://34.200.175.161:3001/api/user/",{name_user:userFavorites,id_meetup_fav:favoriteMeetup.id_meetup_fav}
            ).then((response)=> {
                return response.data;
            }).then(data =>{

            }).catch(function (error) {
                console.log(error);
              });
            window.location.reload();
            return null;
            }
       
    }


    function removeFavoriteHandler(props){
        axiosInstance.delete(`https://34.200.175.161:3001/api/user/${idUser}`,{data:{ id_meetup_fav:props }}).then(()=> {}
        ).catch(function (error) {
            console.log(error);
          });
            window.location.reload();
            return null;
    }

    function itemIsFavoriteHandler(meetupId){
        return id_favortites.some(meetup => meetup[0] === meetupId);
    }
   
    const context={
        favorites: id_favortites,
        totalFavorites: id_favortites.length,
        initFav:InitFavHandler,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };

    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;