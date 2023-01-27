import { useKeycloak } from '@react-keycloak/web';
import {useState,useEffect} from 'react';
import { useContext } from 'react';
import keycloak from '../keycloak';
import FavoritesContext from '../store/favorite-context';

 
function KeycloackHelper(){

  const {keycloak,inistilized}=useKeycloak();
  const [loadedus,setLoadedus] = useState([]);
  const favoriteContext =useContext(FavoritesContext);

  useEffect(()=>{

    keycloak.loadUserProfile(
    ).then((response)=>{
      return response.username;
    }).then(data => {
      setLoadedus(data);
    });
  },[keycloak]);

  favoriteContext.initFav(loadedus);

}



export {KeycloackHelper};
