const axios = require('axios')
// const scoutneturl = "https://min.speiding.no"
const scoutneturl = "https://n2.test.custard.no"

const rollbar = require('../helpers/rollbar')

async function group(req, res) {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(!req.params.groupid){
        res.status(400).json({
            message: 'Group ID not specified.'
        })
        return;
    }
    if(scoutnet_token){
        try {
            const members_request = await axios.get(scoutneturl + '/api/get/memberlist/group/' + req.params.groupid, {
                headers: {
                    'Authorization': 'Bearer ' + scoutnet_token
                }
            })
            res.json(members_request.data).status(200); 
        } catch (error) {
            rollbar.error(error, req)
            return res.status(500).json({ message: error.message, token_sent: scoutnet_token })
        }
    }else{
        res.status(401).json({
            message: 'No token registered in session.'
        })
    }
}

async function troop(req, res) {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(scoutnet_token){
        try {
            const members_request = await axios.get(scoutneturl + '/api/get/memberlist/troop/' + req.params.groupid, {
                headers: {
                    'Authorization': 'Bearer ' + scoutnet_token
                }
            })
            res.json(members_request.data).status(200); 
        } catch (error) {
            rollbar.error(error, req)
            return res.status(500).json({ message: error.message, token_sent: scoutnet_token })
        }
    }else{
        res.status(401).json({
            message: 'No token registered in session.'
        })
    }
}




module.exports = {
    group/*,
    troop*/
}