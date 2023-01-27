import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "https://34.200.175.161:8443/auth/",
 realm: "logrocket",
 clientId: "logrocket",
});

export default keycloak;