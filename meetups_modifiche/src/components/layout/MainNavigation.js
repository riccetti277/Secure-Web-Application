import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useContext} from 'react';
import FavoritesContext from '../../store/favorite-context';
import { useKeycloak } from "@react-keycloak/web";
import RenderOnRole from '../../helpers/RenderOnRole';





function MainNavigation(){
    const favoriteContext=useContext(FavoritesContext);
    const { keycloak, initialized } = useKeycloak();
    return (
    <header className={classes.header}>
        <div className={classes.logo}>React Meetups</div>
        <nav>
            <ul>
                <li><Link to='/'>All Meetups</Link></li>
                {!keycloak.authenticated &&(
                    <li><button className={classes.badge} type="button" onClick={() => keycloak.login()}>Login</button></li>
                )}
                {!!keycloak.authenticated && (
                    <nav>
                    <ul>
                     <RenderOnRole roles={'RealmAdmin'}><li><Link to='/new-meetup'>Add New Meetup</Link></li></RenderOnRole>
                     <li><Link to='/favorites'>
                        Favorites Meetups<span className={classes.badge}>
                            {favoriteContext.totalFavorites}
                        </span></Link></li>
                    <li><button className={classes.badge} type="button" onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</button></li>
                    </ul>
                    </nav>
                )}
            </ul>
        </nav>
    </header>
    );
}

export default MainNavigation;