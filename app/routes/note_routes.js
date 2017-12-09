var ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {
    const myDB = db.db('notable');
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectId(id) }
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ "error": 'And error has occured' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectId(id) }
        myDB.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ "error": 'And error has occured' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectId(id) }
        const note = { title: req.body.title, body: req.body.body }
        myDB.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({ "error": 'And error has occured' });
            } else {
                res.send(item);
            }
        });
    });
    app.post('/notes', (req, res) => {
        const note = { title: req.body.title, body: req.body.body }
        myDB.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}