const server = require('./api/server.js');
const User = require('./api/users/model.js');

const port = 5000;

// START YOUR SERVER HERE

// GET

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
});

// GET BY ID

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
    .then(user => {
        console.log('we are getting -->', user)
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// POST

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
});

// DELETE

server.delete('/api/users/:id', async (req, res) => {
    try {
        const deleted = await User.remove(req.params.id)
        if(!deleted) {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        } else {
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// PUT

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        if(!changes.name || !changes.bio) {
            res.status(400).json({ message: 'Please provide name and bio for the user' })
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else {
                res.json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})