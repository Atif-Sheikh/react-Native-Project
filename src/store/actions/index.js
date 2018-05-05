import ActionTypes from '../constant/constant';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 

export const SignupNow = (data) => {
    return dispatch => {
        dispatch({ type: ActionTypes.SIGNUPERROR, payload: '' });                     
        // InteractionManager.runAfterInteractions(() => {
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
                        if(accountType === 'ngo'){
                            dispatch({type: ActionTypes.NGO, payload: 'NGO'});                                                    
                        }
                        Actions.home();
                    })
                })
                .catch((error) => {
                    console.log(error);                    
                    dispatch({ type: ActionTypes.SIGNUPERROR, payload: error.message });            
                });
        // });
    };
};
export const Popupdata = (obj) => {
    return dispatch => {
        // console.log(obj);
        dispatch({ type: ActionTypes.POPUPDATA, payload: obj });
    };
};
export const Donate = (obj) => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
            console.log(obj);
            let dbDonation;
            let donateRupees;
            firebase.database().ref(`/posts/${obj.key}`).once('value')
                .then((snap) => {
                    let data = snap.val();
                    dbDonation = Number(data['donation']);
                    donateRupees = Number(obj.number);
                })
            firebase.database().ref(`/posts/${obj.key}`).update({donation: dbDonation+donateRupees});
        // })
    };
};
// export const CommentLength = (key) => {
//     return dispatch => {
//         InteractionManager.runAfterInteractions(() => {
//             console.log(key);
//             firebase.database().ref(`/messages/${key}`).on('value', snap => {
//                 let data = snap.val();
//                 let arr = [];
//                 let length;
//                 for(let key in data){
//                     arr.push(data[key]);
//                 }
//                 length = arr.length;
//                 dispatch({ type: ActionTypes.COMMENTLENGTH, payload: length });
//             })
//         });
//     };
// };
export const CheckLogin = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref(`/users/${user.uid}`).once('value')
                    .then((snap) => {
                        let data = snap.val();
                        if(data['accountType'] === 'ngo'){
                            dispatch({type: ActionTypes.NGO, payload: 'NGO'});
                            Actions.home();
                        }else if(data['accountType'] === 'user'){
                            Actions.home();
                        }
                    })
            }else{
                Actions.withoutAuth();
            }
        });
    };
};
export const MessageKey = (obj) => {
    return dispatch => {
        console.log(obj);
        // let requirement = obj.requirement;
        // let key = obj.key;
        dispatch({ type: ActionTypes.CURRENTREQUIREMENT, payload: obj });
        // dispatch({ type: ActionTypes.MESSAGEKEY, payload: key });
    };
};
export const getNGOs = () => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
            firebase.database().ref(`/users`).once('value')
                .then((snap) => {
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
        // });
    };
};
export const SendMessage = (obj) => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
            console.log(obj);
            let msg = obj.msg;
            var name;
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    firebase.database().ref(`/users/${user.uid}`).once('value')
                        .then((snap) => {
                            let data = snap.val();
                            let name = data['name'];
                            console.log(obj, name);
                            if(name && obj){
                                let OldComments;
                                firebase.database().ref(`/messages/${obj.key}`).push({ message: msg, name: name });
                                firebase.database().ref(`/posts/${obj.key}`).on('value', snap => {
                                    let data = snap.val();
                                    OldComments = data['comments'];
                                })
                                firebase.database().ref(`/posts/${obj.key}`).update({comments: OldComments+1});
                            }else{
                                alert('something went wrong...');
                            }
                        })
                }
            })
        // });
    };
};
export const GetMessages = (key) => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
            firebase.database().ref(`/messages/${key}`).on('value', snap => {
                let messages = [];
                let data = snap.val();
                for(let key in data){
                    messages.push(data[key]);
                }
                dispatch({ type: ActionTypes.GETMESSAGES, payload: messages });
            // })
        });
    };
};
export const getUsers = () => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
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
        // });
    };
};
export const GetNGOData = () => {
    return dispatch => {
        InteractionManager.runAfterInteractions(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    firebase.database().ref(`/posts`).on('value', snap => {
                        let data = snap.val();
                        let NGOsPosts = [];
                        let NGOsPostsKeys = [];
                        for(let key in data){
                            if(data[key]['UID'] === user.uid){
                                NGOsPostsKeys.push(key);
                                NGOsPosts.push(data[key]);
                            }
                        }
                        console.log(NGOsPosts, NGOsPostsKeys)
                    dispatch({type: ActionTypes.NGOSPOSTS, payload: NGOsPosts});
                    dispatch({type: ActionTypes.NGOSPOSTSKEYS, payload: NGOsPostsKeys});
                    })
                }
            })
        });
    };
};
export const GetData = () => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
            console.log('console') 
            firebase.database().ref(`/posts/`).on('value', snap => {
            console.log(snap.val());            
                let data = snap.val();
                let allPosts = [];
                let postKeys = [];
                if(data){
                    for(let key in data){
                        postKeys.push(key);
                        allPosts.push(data[key]);
                    }
                }
                // console.log(allPosts, postKeys);
                dispatch({type: ActionTypes.GETKEYS, payload: postKeys});            
                dispatch({type: ActionTypes.GETDATA, payload: allPosts});
            })
        // });
    };
};
export const likePost = (key) => {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
            // console.log('like', key);
            let totalLikes;
            let UID;
            let like = false;
            let likeKey;
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    firebase.database().ref(`/posts/${key}/`).on('value', snap => {
                        let data = snap.val();
                        totalLikes = data.likes;
                        UID = user.uid;
                        for(let key in data){
                            if(UID === data[key]['uid']){
                                // console.log(data[key]['uid'])
                                like = true;
                                likeKey = key;
                                break;
                            }
                        }
                    })
                    // console.log(like);                
                    if(like){
                        firebase.database().ref(`/posts/${key}/`).update({likes: totalLikes-1});
                        firebase.database().ref(`/posts/${key}/${likeKey}`).remove();                                            
                        // console.log(like, likeKey);
                    }else{
                        // console.log(like);                    
                        firebase.database().ref(`/posts/${key}/`).update({likes: totalLikes+1});
                        firebase.database().ref(`/posts/${key}/`).push({uid: UID});                
                    }
                }
            })
        // });
    };
};
// export const dislikePost = (key) => {
//     return dispatch => {
//         InteractionManager.runAfterInteractions(() => {
//             console.log('like', key);
//             let totalLikes;
//             firebase.database().ref(`/posts/${key}/`).on('value', snap => {
//                 let data = snap.val();
//                 totalLikes = data.likes;
//                 console.log(data, data.likes);
//             })
//             firebase.database().ref(`/posts/${key}/`).update({likes: totalLikes-1});
//         });
//     };
// };
export const Requirement = (data) => {
    return dispatch => {
        InteractionManager.runAfterInteractions(() => {
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
                    data.comments = 0;
                    data.donation = 0;
                    // data.number = user.phoneNumber;
                    firebase.database().ref(`/posts/`).push(data);
                }
            });
        });
    };
};
export const SiginNow = (user) => {
    return dispatch => {
        dispatch({ type: ActionTypes.ERROR, payload: '' });
        // InteractionManager.runAfterInteractions(() => {
            console.log(user);        
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                console.log(result)
                    firebase.database().ref(`/users/${result.uid}/`).on('value', snap => {
                        let data = snap.val();
                        if(data.accountType === 'ngo'){
                            dispatch({ type: ActionTypes.SIGNIN, payload: result });                            
                            dispatch({type: ActionTypes.NGO, payload: 'NGO'});                        
                            Actions.home();
                        }else{
                            dispatch({ type: ActionTypes.SIGNIN, payload: result });
                            dispatch({type: ActionTypes.NGO, payload: 'user'});                        
                            Actions.home();
                        }
                    });
            })
            .catch((error) => {
                console.log(error)            
                dispatch({ type: ActionTypes.ERROR, payload: error.message });
            });
        // }); 
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
