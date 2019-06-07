const axios = require('axios')
// const scoutneturl = "https://min.speiding.no"
const scoutneturl = "https://n2.test.custard.no"


async function image(req, res, next) {
    const scoutnet_token = req.session.user ? (req.session.user.scoutnet_token || false) : false;
    if(scoutnet_token){
        try {
            const image_request = await axios.get(scoutneturl + '/api/get/profile_image', {
                headers: {
                    'Authorization': 'Bearer ' + scoutnet_token
                },
                responseType: 'arraybuffer'
            })
            const image = new Buffer.from(image_request.data, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': image.length
              });
            res.end(image); 
        } catch (error) {
            return res.status(500).json({ message: error.message, token_sent: scoutnet_token })
        }
    }else{
        res.status(401).json({
            message: 'No token registered in session.'
        })
    }
}


module.exports = {
    image
}