async function image(req, res, next) {
    const token = req.session.user.scoutnet_token
    if(token){
        try {
            const image_request = await axios.get('https://min.speiding.no/api/get/profile_image', {
                headers: {
                    'Authorization': 'Bearer ' + scoutnet_token
                }
            })
    
            res.setHeader("Content-Type", "image/png");
            res.send(image_request.data)
    
        } catch (error) {
            return res.status(500).json({ message: error.message })
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