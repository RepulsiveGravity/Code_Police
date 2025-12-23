const axios = require('axios');

exports.fetchCFStats = async (handle) => {
    try {
        console.log(`Fetching Codeforces data for: ${handle}`);

        if (!handle) throw new Error('No Codeforces handle provided');

        // 1. Fetch Basic Info (Rank, Rating)
        const userInfoRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);

        if (userInfoRes.data.status !== 'OK' || !Array.isArray(userInfoRes.data.result)) {
            throw new Error('Codeforces user not found or API error');
        }

        const userInfo = userInfoRes.data.result[0];

        // 2. Fetch Submissions
        const submissionRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);

        let totalSolved = 0;
        
        if (submissionRes.data.status === 'OK' && Array.isArray(submissionRes.data.result)) {
            const solvedProblems = new Set();
            submissionRes.data.result.forEach(sub => {
                if (sub.verdict === 'OK') {
                    solvedProblems.add(`${sub.problem.contestId}-${sub.problem.index}`);
                }
            });
            totalSolved = solvedProblems.size;
        }

        console.log(`Success! Found ${totalSolved} solved problems.`);

        return {
            handle: userInfo.handle,
            rank: userInfo.rank || 'unrated',
            rating: userInfo.rating || 0,
            maxRating: userInfo.maxRating || 0,
            titlePhoto: userInfo.titlePhoto,
            totalSolved: totalSolved
        };

    } catch (err) {
        console.error("Codeforces Service Error:", err.message);
        throw err;
    }
};