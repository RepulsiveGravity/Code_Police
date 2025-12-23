const axios = require('axios');

exports.fetchLeetcodeStats = async(handle) => {
    try{
        console.log(`Fetching Leetcode data for: ${handle}`);

        const query = `
            query userProblemsSolved($username: String!){
                matchedUser(username: $username){
                    submitStats: submitStatsGlobal{
                        acSubmissionNum{
                            difficulty
                            count
                        }
                    }
                    profile{
                        ranking
                    }
                }
            }
        `;

        const response = await axios.post(
            'https://leetcode.com/graphql',
            {
                query,
                variables: {
                    username: handle
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Referer': 'https://leetcode.com'
                }
            }
        );

        const data = response.data.data;

        if(!data || !data.matchedUser){
            throw new Error("Leetcode user not found");
        }

        const totalSolved = data.matchedUser.submitStats.acSubmissionNum.find(
            (item) => item.difficulty === 'All'
        ).count;

        console.log(`Success! Found ${totalSolved} solved problems.`);

        return{
            handle: handle,
            totalSolved: totalSolved,
            rank: data.matchedUser.profile.ranking
        };

    } catch(err){
        console.error("Leetcode Fetch Error", err.message);
        return null;
    }
};