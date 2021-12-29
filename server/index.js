const PORT = 8000;
const express = require('express');
const bcrypt = require('bcrypt');
const { v1: uuidv1 } = require('uuid');
const app = express();
const cors = require('cors');
const { connect } = require('getstream');
app.use(cors())
app.use(express.json())

const API_KEY = '65ukcf2g2k62';
const API_SECRET = 'u388c2x2rvwg2u9eyft36jbs8t42b432cyfruhcum2r78xtjz65wsp8m7f2b7fz2';
const API_ID = 1159237;

// Sign up
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userId = uuidv1();
        const hashedPassword = await bcrypt.hash(password, 10);
        const client = connect(API_KEY, API_SECRET, API_ID);
        const token = client.createUserToken(userId);

        res.status(200).json({ username, userId, hashedPassword, token })

        console.log(username, password);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))