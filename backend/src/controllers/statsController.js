const pool = require('../config/db');
const cfService = require('../services/codeforcesService');

exports.getStats = async(req, res) => {
    const userId = req.user.id; // From middleware
    const { platform } = req.params; // 'codeforces', 'leetcode', etc.

    try{
        // Get user's handles from DB
        const user = await pool.query('SELECT codeforces_handle FROM users WHERE id = $1', [userId]);
        const handles = user.rows[0];

        let data;

        if(platform === 'codeforces'){
            if(!handles.codeforces_handle){
                return res.status(400).json({
                    msg: 'Codeforces handle not linked'
                });
            }
            data = await cfService.fetchCFStats(handles.codeforces_handle);
        } else if(platform === 'leetcode'){
            // logic for leetcode...
            data = { msg : 'LeetCode implementation coming soon' };
        } else{
            return res.status(400).json({
                msg: 'Invalid platform'
            });
        }

        res.json(data);
    
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};