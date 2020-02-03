const axios = require('axios')
const scoutneturl = process.env.SCOUTNET_URL || "https://n2.test.custard.no";

const kategori = require('../models/Kategori');
const kommentar = require('../models/Kommentar');
const traad = require('../models/Traad');

const rollbar = require('../helpers/rollbar')


async function getCategories(req, res){
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(scoutnet_token){
        kategori.find({}, (err, cats) => {
            res.status(200).json({
                result: cats
            })
        }).catch(err => {
            res.status(500).json({
                err
            })
        })
    }else{
        res.status(401).json({
            message: 'No token registered in session.'
        })
    }
}

async function getPosts(req, res) {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(true){
        console.log("True");
        
        kategori.findById(req.query.id, (err, kat_doc) => {
            console.log("Kategori", req.query, err, kat_doc);
            
            traad.find({category: req.query.id}, (err, traads) => {
                console.log("Traads ", traads);
                
                res.status(200).json({
                    result: traads,
                    category: {
                        title: kat_doc.title,
                        description: kat_doc.caption
                    }
                })
            }).catch(err => {
                res.status(500).json({
                    err
                })
                return;
            })
        }).catch(err => {
            if (err){
                res.status(500).json({
                    err
                })
                return;
            }
        })
    }else{
        res.status(401).json({
            message: 'No token registered in session.'
        })
    }
}

async function getComments(req, res) {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(scoutnet_token){
        kommentar.find({}, (err, comments) => {
            res.status(200).json({
                result: comments
            })
        }).catch(err => {
            res.status(500).json({
                err
            })
        })
    }else{
        res.status(401).json({
            message: 'No token registered in session.'
        })
    }
}

async function createCategory(req, res) {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(scoutnet_token && (req.session.user.app_access.includes("2001") || req.session.user.app_access.includes("1"))){
        let newCat = {
            title: req.body.name,
            caption: req.body.description
        }
        kategori.create(newCat).then((doc) => {
            res.status(200).json({
                status: 200,
                id: doc._id
            })
        }).catch(err => {
            res.status(500).json({
                err
            })
        })
    }else{
        res.status(401).json({
            err: "Du har ikke app-tilgangen registrert i Min speiding, eller er ikke innlogget."
        })
    }
}

async function createPost(req, res) {
    let newPost = {
        author: req.session.user.full_name,
        author_no: req.session.user.member_no,
        title: req.body.title,
        content: req.body.content,
        category: req.body.categoryid
    }
    traad.create(newPost).then(doc => {
        res.status(200).json({
            status: 200,
            data: doc._id
        })
    }).catch(err => {
        if(err) throw err;
    });
}

async function createComment(req, res) {
    let newComment = {
        author: 'Test Testesen',
        author_no: 200660,
        content: req.body.content,
        post: req.body.postid
    }
    kommentar.create(newComment).then(doc => {
        traad.findByIdAndUpdate(req.body.traad_id, {
            $push: {
                comments: doc._id
            }
        }).catch(err=>{
            if(err) throw err;
        })
    }).then(doc => {
        res.status(200).json({
            status: 200,
            data: doc
        })
    }).catch(err => {
        if(err) throw err;
    });
}

module.exports = {
    getCategories,
    getPosts,
    getComments,
    createCategory,
    createPost,
    createComment
}