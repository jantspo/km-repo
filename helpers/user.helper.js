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

const getUserAlertStatus = () => {
  const userData = window.localStorage.getItem('user');
  const user = JSON.parse(userData);
  return user.email_alerts;
}

const updateUserData = (data) => {
  const userData = window.localStorage.getItem('user');
  const user = JSON.parse(userData);
  const updatedUser = {...user, ...data};
  window.localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser
}

export {setUserData, getUserId, getUserAlertStatus, updateUserData};