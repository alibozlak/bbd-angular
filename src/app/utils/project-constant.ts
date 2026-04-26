export const userActivityType = {
    CRAETE : "CREATE",
    UPDATE : "UPDATE",
    REMOVAL_TYPE_GIVE : "REMOVAL_TYPE_GIVE",
    REMOVAL_TYPE_SALE : "REMOVAL_TYPE_SALE"
};

export const user = {
    getUserId : () => {
        return localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!) : 0
    }    
}

export const utilFunctions = {
    convertLocalDateStringToTurkeyDateString : (localDateString : String) => 
        `${localDateString.substring(8)}-${localDateString.substring(5,7)}-${localDateString.substring(0,4)}`
  
}