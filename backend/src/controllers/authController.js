const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res) => {
    const { email, password, cfHandle, leetcode_handle } = req.body;

    console.log('Signup Request Recieved:', req.body);
    try{
        // 1. Check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userCheck.rows.length > 0){
            return res.status(400).json({
                msg: 'User already exists'
            });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Insert int DB
        const newUser = await pool.query(
            'INSERT INTO users (email, password, codeforces_handle, leetcode_handle) VALUES ($1, $2, $3, $4) RETURNING *', [email, hashedPassword, cfHandle, leetcode_handle]
        );

        // 4. Return JWT
        const payload = {
            user: {
                id: newUser.rows[0].id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if(err){
                throw err;
            }
            res.json({
                token
            });
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async(req, res) => {
    const { email, password } = req.body;
    try{
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user.rows.length === 0){
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if(!isMatch){
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }

        const payload = {
            user: {
                id: user.rows[0].id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if(err){
                throw err;
            }
            res.json({
                token
            });
        })
    } catch(err){
        res.status(500).send('Server Error');
    }
};