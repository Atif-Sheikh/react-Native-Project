import ActionTypes from '../constant/constant';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 

export const SignupNow = (data) => {
    return dispatch => { 
    let { email, password, userName, accountType, number } = data;
    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
            let user1 = {
                email: email,
                uid: result.uid,
                name: userName,
                accountType,
                number,
            };
            firebase.database().ref(`/users/${result.uid}`).set(user1).then((user) => {
                firebase.auth().currentUser.updateProfile({displayName: userName, phoneNumber: number})
                dispatch({ type: ActionTypes.SIGNUP, payload: user1 })
                Actions.home();
            })
        })
        .catch((error) => {
            console.log(error);                    
            dispatch({ type: ActionTypes.SIGNUPERROR, payload: error.message });            
        });
    };
};
export const getNGOs = () => {
    return dispatch => {
        firebase.database().ref(`/users`).on('value', snap => {
            let data = snap.val();
            let ngos = [];
            for(let key in data){
                if(data[key]['accountType'] === 'ngo'){
                    ngos.push(data[key]);
                }
            }
            // console.log(ngos);
            dispatch({ type: ActionTypes.GETNOGOS, payload: ngos});
        })
    };
};
export const getUsers = () => {
    return dispatch => {
        firebase.database().ref(`/users`).on('value', snap => {
            let data = snap.val();
            let users = [];
            for(let key in data){
                if(data[key]['accountType'] === 'user'){
                    users.push(data[key]);
                }
            }
            // console.log(ngos);
            dispatch({ type: ActionTypes.GETUSERS, payload: users});
        })
    };
};
export const GetData = () => {
    return dispatch => {
        console.log('console')
        firebase.database().ref(`/posts/`).on('value', snap => {
        console.log('console')            
            let data = snap.val();
            let allPosts = [];
            let postKeys = [];
            if(data){
                for(let key in data){
                    postKeys.push(key);
                    allPosts.push(data[key]);
                }
            }
            console.log(allPosts, postKeys);
            dispatch({type: ActionTypes.GETKEYS, payload: postKeys});            
            dispatch({type: ActionTypes.GETDATA, payload: allPosts});
        })
    };
};
export const likePost = (key) => {
    return dispatch => {
        console.log('like', key);
        let totalLikes;
        firebase.database().ref(`/posts/${key}/`).on('value', snap => {
            let data = snap.val();
            totalLikes = data.likes;
            console.log(data, data.likes);
        })
        firebase.database().ref(`/posts/${key}/`).update({likes: totalLikes+1});
    };
};
export const dislikePost = (key) => {
    return dispatch => {
        console.log('like', key);
        let totalLikes;
        firebase.database().ref(`/posts/${key}/`).on('value', snap => {
            let data = snap.val();
            totalLikes = data.likes;
            console.log(data, data.likes);
        })
        firebase.database().ref(`/posts/${key}/`).update({likes: totalLikes-1});
    };
};
export const Requirement = (data) => {
    return dispatch => {
        let { requirement, rupees } = data;
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log(user)
                let name;
                firebase.database().ref(`/users/${user.uid}`).on('value', snap => {
                    let values = snap.val();
                    name = values['name'];
                });
                data.UID = user.uid;
                data.email = user.email;
                data.name = name;
                data.likes = 0;
                // data.number = user.phoneNumber;
                firebase.database().ref(`/posts/`).push(data);
            }
        });
    };
};

export const SiginNow = (user) => {
    return dispatch => {
        console.log(user);        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {
            console.log(result)
                firebase.database().ref(`/users/${result.uid}/`).on('value', snap => {
                    let data = snap.val();
                    if(data.accountType === 'ngo'){
                        dispatch({ type: ActionTypes.SIGNIN, payload: result })
                        Actions.NGOHome();
                    }else{
                        dispatch({ type: ActionTypes.SIGNIN, payload: result })
                        Actions.home();
                    }
                });
        })
        .catch((error) => {
            console.log(error)            
            dispatch({ type: ActionTypes.ERROR, payload: error.message });
        });
    };
};
export const logOutNow = () => {
    return dispatch => {
        console.log('user')
        firebase.auth().signOut()
        .then(() => {
        console.log('user')
            Actions.login();
        }).catch((error) => {
        console.log('user')            
            alert(error.message);
        });
    };
};
