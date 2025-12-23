const pool = require('../config/db');
const cfService = require('../services/codeforcesService');
const lcService = require('../services/leetcodeService');

exports.getStats = async(req, res) => {
  const userId = req.user.id;
  const { platform } = req.params;

  try {
    const userRes = await pool.query('SELECT codeforces_handle, leetcode_handle FROM users WHERE id = $1', [userId]);
    
    if(userRes.rows.length === 0){
        return res.status(404).json({
            msg: 'User not found'
        });
    }
    
    const { codeforces_handle, leetcode_handle } = userRes.rows[0];

    if (platform === 'codeforces') {
      if (!codeforces_handle){
        return res.status(400).json({
            msg: 'Codeforces handle not linked'
        });
      }

      const data = await cfService.fetchCFStats(codeforces_handle);

      await pool.query('UPDATE users SET cf_rating = $1 WHERE id = $2', [data.rating, userId]);

      const rankQuery = await pool.query('SELECT COUNT(*) FROM users WHERE cf_rating > $1', [data.rating]);
      const websiteRank = parseInt(rankQuery.rows[0].count) + 1;

      res.json({
        userId: userId,
        handle: data.handle,
        solved: data.totalSolved,
        plaformRank: data.rank,
        websiteRank: websiteRank,
        rating: data.rating
      });
    } else if(platform === 'leetcode'){
        if(!leetcode_handle){
            return res.status(400).json({
                msg: 'Leetcode handle not linked'
            });
        }

        const data = await lcService.fetchLeetcodeStats(leetcode_handle);
        if(!data){
            return res.status(500).json({
                msg: 'Failed to fetch Leetcode data'
            });
        }

        await pool.query('UPDATE users SET lc_solved = $1 WHERE id = $2', [data.totalSolved, userId]);

        const rankQuery = await pool.query('SELECT COUNT(*) FROM users WHERE lc_solved > $1', [data.totalSolved]);
        const websiteRank = parseInt(rankQuery.rows[0].count) + 1;

        return res.json({
            userId: userId,
            handle: data.handle,
            solved: data.totalSolved,
            platformRank: data.rank,
            websiteRank: websiteRank
        });
    } else{
        return res.status(400).json({
            msg: 'Invalid platform'
        });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};