const axios = require('axios');

exports.fetchCFStats = async(handle) => {
    try{
        // Codeforces API: user.info returns rank, ratings, etc.
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);

        if(response.data.status === 'OK'){
            return response.data.result[0];
        }
        return null;
    } catch(error){
        console.error("Error fetching CF data: ", error);
        throw error
    }
};