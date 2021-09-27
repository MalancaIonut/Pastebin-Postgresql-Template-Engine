const express = require('express');
const router = express.Router();
const query = require('../model/querys');
const {body, validationResult} = require('express-validator');

router.get('/', (req, res) => {
    res.render('createPaste');
});

router.post('/newPaste', body('title').isLength({ min : 1 }), body('content').isLength({ min : 1 }), (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.render('messages', {message: 'A empty paste can not be created', location: '/pasteList'});
    }
    query.createPaste(req.body)
    .then(response => {
        const resMessage = response;
        res.render('messages', {message: resMessage, location: '/pastesList'});
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.get('/pastesList', (req, res) => {
    query.getPastes()
    .then(response => {
        const resPastes = response;
        res.render('pasteList', {pastes: resPastes});
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.get('/pastes/:id', (req, res) => {
    query.selectAPaste(req.params.id)
    .then(response => {
        const resPaste = response;
        res.render('selectedPaste', {paste: resPaste});
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.post('/delete/:id', (req, res) => {
    query.deletePaste(req.params.id)
    .then(response => {
        const ResMessage = response;
        res.render('messages', {message: ResMessage, location: '/pastesList'});
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

module.exports = router;