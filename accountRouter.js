const express = require('express');

const db = require('./data/dbConfig.js');

const router = express();

// initial get request
router.get('/', (req, res) => {
	db
		.select('*')
		.from('accounts')
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'failed to get accounts' });
		});
});

router.get('/:id', (req, res) => {
	db
		.select('*')
		.from('accounts')
		.where('id', '=', req.params.id)
		.first()
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((err) => {
			res.status(500).json({ error: 'error getting account' });
		});
});

router.post('/', (req, res) => {
	// need to validate the data sent from the client
	db
		.insert(req.body, 'id')
		.into('accounts')
		.then((ids) => {
			res.status(200).json(ids);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'failed to insert account' });
		});
});

router.put('/:id', (req, res) => {
	const changes = req.body;
	//validate data before you make a call to the database
	// tried setting req.params.id to a variable but didn't work so put an object into .where
	db('accounts')
		.where({ id: req.params.id })
		.update(changes)
		.then((count) => {
			console.log(count);
			res.status(200).json(count);
		})
		.catch((err) => {
			res.status(500).json({ error: ' failed to update post' });
		});
});

router.delete('/:id', (req, res) => {
	// tried setting req.params.id to a variable but didn't work so put an object into .where
	const changes = req.body;
	db('accounts')
		.where({ id: req.params.id })
		.del(changes)
		.then((count) => {
			res.status(200).json(count);
		})
		.catch((err) => {
			res.status(500).json({ error: 'failed to delete post' });
		});
});

module.exports = router;
