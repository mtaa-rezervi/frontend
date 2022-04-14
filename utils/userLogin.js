import { saveKeyValue } from "./secureStore";

export default async function userLogin(user, pass, navigation){
    try {
      const response = await fetch('https://mtaa-backend.herokuapp.com/users/login', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: user,
              password: pass
          })
      });
      const json = await response.json();
      
      if(response.status == 200){
        console.log(json.token, typeof json.token);

        var storeTokenKey = 'bearer';
        var storeTokenValue = JSON.stringify(json.token);
        // store users jwt token
        if(json.token){
        saveKeyValue(storeTokenKey, storeTokenValue).catch(error => {
            console.error(error);
        });
        }

        var storeIdKey = '_id';
        var storeIdValue = JSON.stringify(json._id);
        saveKeyValue(storeIdKey, storeIdValue).catch(error => {
            console.error(error);
        });

        var storeUsernameKey = 'username';
        var storeUsernameValue = user;
        saveKeyValue(storeUsernameKey, storeUsernameValue).catch(error => {
            console.error(error);
        });
            
        navigation.navigate('TabNavigator');
      }
      else if(response.status == 404){
          alert(json.error.message);
      }

    } catch (error) {
      console.error(error);
    }
  };