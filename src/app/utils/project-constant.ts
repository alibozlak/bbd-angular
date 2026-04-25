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