import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute =({roles,children})=> {

const {keycloak} =useKeycloak();
const isLoggedIn = keycloak.authenticated;
    if(keycloak.hasRealmRole(roles) && isLoggedIn){
        return children;
    }else{
        return null;
    }

};



export default PrivateRoute;