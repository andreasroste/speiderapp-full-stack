const axios = require('axios')

const jwt = require('../helpers/jwt')

module.exports = async (req, res, next) => {

    let scoutnet_token = ''
    let result = {}


    // Authenticate and get basic user data
    try {
        const auth_request = await axios.post('https://min.speiding.no/api/authenticate', {
            username: req.body.username,
            password: req.body.password
        })
        scoutnet_token = auth_request.data.token
        result.token = jwt.signToken({token: scoutnet_token})
    } catch(error) {
        return res.status(401).json({message: error.message})
    }



    // Get user's roles
    try {
        const role_request = await axios.get('https://min.speiding.no/api/get/user_roles', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        result.roles = role_request.data

    } catch (error) {
        return res.status(500).json({message: error.message})
    }



    // Get user's profile
    try {
        const profile_request = await axios.get('https://min.speiding.no/api/get/profile', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        result.member = profile_request.data

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
    return res.status(200).json(result)

}