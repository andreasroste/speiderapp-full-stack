const axios = require('axios')
//const scoutneturl = "https://min.speiding.no"
const scoutneturl = "https://n2.test.custard.no"

const jwt = require('../helpers/jwt')

module.exports = async (req, res, next) => {

    let scoutnet_token = ''
    let result = {}


    // Authenticate and get basic user data
    try {
        const auth_request = await axios.post(scoutneturl + '/api/authenticate', {
            username: req.body.username,
            password: req.body.password
        })
        req.session.user = {
            scoutnet_token: auth_request.data.token
        }
        scoutnet_token = auth_request.data.token
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }



    // Get user's roles
    try {
        const role_request = await axios.get(scoutneturl + '/api/get/user_roles', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        result.roles = role_request.data
        req.session.user.roles = role_request.data

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }



    // Get user's profile
    try {
        const profile_request = await axios.get(scoutneturl + '/api/get/profile', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        result.member = profile_request.data

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    /*let flatrolesresult = []
    Object.keys(role_request.data).map((level_key) => {
        let level = role_request.data[level_key]
        Object.keys(level).map((org_key) => {
            let org = level[org_key]
            Object.keys(org).map((role_key) => {
                let role = org[role_key]

            })
        })
    })

    req.rolesflat = flatrolesresult*/

    // result.sessiondata = req.session

    return res.status(200).json(result)

}