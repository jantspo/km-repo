const setUserData = () => {
    const userData = window.localStorage.getItem('user');
    if(userData){
      return true
    }else{
      return false
    }
}

const getUserId = () => {
    const userData = window.localStorage.getItem('user');
    const user = JSON.parse(userData);
    return user.id;
}

export {setUserData, getUserId};