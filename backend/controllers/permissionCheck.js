const scoutneturl = process.env.SCOUTNET_URL || "https://min.speiding.no";
const rollbar = require('../helpers/rollbar')

module.exports = (req,res) => {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(scoutnet_token){
        try {
            const members_request = await axios.get(scoutneturl + '/check_permission?permission=' + req.params.permission + '&body_type=' + req.params.bodytype + '&body_id=' + req.params.bodyid, {
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