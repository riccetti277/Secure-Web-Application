import classes from './MeetupItem.module.css';
import Card from '../UI/Card';
import {useContext} from 'react';
import FavoritesContext from '../../store/favorite-context';
import RenderOnRole from '../../helpers/RenderOnRole';
import axios from 'axios';
import axiosInstance from '../../helpers/AxiosHelpers';
import {useNavigate} from 'react-router-dom';

function MeetupItem(props){
    const favoriteContext =useContext(FavoritesContext);
    const itemIsFavorite=favoriteContext.itemIsFavorite(props.id);
    let navigate=useNavigate();
    
    

    function toggleFavoriteStatusHandler(){
       
        if(itemIsFavorite){
            favoriteContext.removeFavorite(props.id);
        }else{
            favoriteContext.addFavorite({
                id_meetup_fav:props.id,
            });
        }
    }

    function toogleDeleteHandler(){

        axiosInstance.delete("https://34.200.175.161:3001/api/meetupn/",{data:{id:props.id}}).then(()=> {
            window.location.reload();
            alert("Meetup Deleted successfully");
        }).catch(function (error) {
            console.log(error);
          });
            
    }

    const toogleModifyHandler=()=>{
       navigate(`/modify/${props.id}`,
       {state:{id:props.id,title:props.title,address:props.address,image:props.image,description:props.description}});
    }


    return (
    <li className={classes.item} >
        <Card>
        <div className={classes.image}>
            <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
            <h3>{props.title}</h3>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
        <RenderOnRole roles={'RealmAdmin'}><button onClick={() => {toogleDeleteHandler()}}>Elimina</button></RenderOnRole>
        <RenderOnRole roles={'RealmAdmin'}><button onClick={() =>{toogleModifyHandler()}}>Modifica</button></RenderOnRole>
        <RenderOnRole roles={'default-roles-logrocket'}><button onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}</button></RenderOnRole>
        </div>
        </Card>
    </li>
   
    );
    
}

export default MeetupItem;