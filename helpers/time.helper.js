const getDateTime = (timestamp) => {
    if(timestamp){
        const date = new Date(timestamp);
        // return new Intl.DateTimeFormat('en-US').format(date);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }else{
        return '';
    }
    
}

export {getDateTime};