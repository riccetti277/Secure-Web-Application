import {Routes,Route} from 'react-router-dom';
import AllMeetupsPage from './pages/homepage/AllMeetups';
import NewMeetupPage from './pages/secured/NewMeetup';
import FavoritesPage from './pages/secured/Favorites';
import Layout from './components/layout/Layout';
import PrivateRoute from "./helpers/PrivateRoute";
import ModifyMeetupPage from './pages/secured/ModifyMeetup';
import KeycloackHelper from './helpers/KeycloakHelper';
import FavoritesContext from './store/favorite-context';
import {useContext} from 'react';



function App() {
  
  return (
    
  <Layout>
    <Routes>
    <Route path='/' element={<PrivateRoute roles={'default-roles-logrocket'}><AllMeetupsPage /></PrivateRoute>}/>
    <Route path='/new-meetup'  element={<PrivateRoute roles={'RealmAdmin'}><NewMeetupPage /></PrivateRoute>}/>
    <Route path='/favorites'  element={<PrivateRoute roles={'default-roles-logrocket'}><FavoritesPage /></PrivateRoute>} />
    <Route path='/modify/:id'  element={<PrivateRoute roles={'RealmAdmin'}><ModifyMeetupPage/></PrivateRoute>}/>
    </Routes>
  </Layout>
 
  );
  
}

export default App;
