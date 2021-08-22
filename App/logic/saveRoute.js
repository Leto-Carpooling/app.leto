import { api } from "../config/api";
const { user } = useContext(AppContext);

/**
 * This function saves the route to firebase after receiving its id from the OT server.
 * Every user can only have one active route, so every other uncompleted routes will be deleted
 * and completed routes will remain
 * 
 * @param {MapAPIRoute} route 
 */

export default function saveRoute(route){
    const config = {
        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            auth: user.token,
        },
    };
    
    const params = new URLSearchParams();
          params.append("route-id", "new");
    
    api.post(`route/saveRoute.php`, params, config)
        .then((resp) => {
            Log("Adding route", resp.data);
            if (resp.data.status !== "OK") {
                console.log(resp.data);
                let deleteId = resp.data.message.deletedRouteId;
                
                if(deleteId != 0){
                    deleteFromFirebase(route, resp);
                }

                saveToFirebase(route, resp);

            } else {
                console.log(resp.data);
            }
        })
        .catch((err) => {
            Log("Adding route error", err);
    });
}

/**
 * Saves the route to firebase realtime database and returns its id
 * @param {MapAPIRoute} route - from the google map api
 * @param {JSON} response - response from the OT server
 */
function saveToFirebase(route, response){
    let routeId = response.routeId;
    
}

/**
 * Deletes a route from the realtime database on firebase.
 * @param {MapApiRoute} route - from the google map api
 * @param {JSON} response - response from the OT server
 */
function deleteFromFirebase(route, response){

}
