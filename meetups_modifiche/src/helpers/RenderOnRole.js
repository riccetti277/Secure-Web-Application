
import keycloak from '../keycloak';


export default function RenderOnRole({roles,children}){
    
    if(!keycloak.hasRealmRole(roles))
        return null;
    
    return children;
}

