const axios = require('axios')
const Storage = require('node-storage');
const store = new Storage('../storage.json');

const scoutneturl = process.env.SCOUTNET_URL || "https://n2.test.custard.no";

const rollbar = require('../helpers/rollbar')

module.exports = async (req, res, next) => {

    let scoutnet_token = ''
    let result = {}

    let authrequestglobal;

    // Authenticate and get basic user data
    try {
        const auth_request = await axios.post(scoutneturl + '/api/authenticate', {
            username: req.body.username,
            password: req.body.password,
            app_id: process.env.MIN_SPEIDING_UUID,
            app_name: 'Speiderappen (app.speiding.no)',
            device_name: req.get('user-agent')
        });
        authrequestglobal = auth_request;
        req.session.user = {
            scoutnet_token: auth_request.data.token,
            app_access: [],
            full_name: '',
            member_no: auth_request.data.member.member_no
        }
        scoutnet_token = auth_request.data.token
    } catch (error) {
        return res.status(401).json({ step:'Authentication', message: error.message })
    }

    // Get user's roles
    let info = {
        authrequestglobal,
        url: scoutneturl + '/api/get/user_roles',
        headers: {
            'Authorization': 'Bearer ' + scoutnet_token
        },

    }
    try {
        const role_request = await axios.get(scoutneturl + '/api/get/user_roles', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        let roleresult = []
        for (const level in role_request.data) {
            if (role_request.data.hasOwnProperty(level)) {
                const roles_on_level = role_request.data[level];
                if (Object.keys(roles_on_level).length) {
                    for (const body_id in roles_on_level) {
                        let hurra = Object.assign({}, roles_on_level[body_id])
                        for (const roleid in hurra) {
                            roleresult.push({ body_id, level, roleid, role_key: hurra[roleid] })
                        }
                    }
                }

            }
        }

        result.roles = roleresult
        req.session.user.roles = roleresult

    } catch (error) {
        rollbar.error(error, req)
        return res.status(500).json({ step: 'roles', scoutnet_token, info, message: error.message })
    }


    // Get user's profile
    try {
        const profile_request = await axios.get(scoutneturl + '/api/get/profile', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        result.member = profile_request.data

        let app_access = Object.values(profile_request.data['contact_info']).map(c => {
            if(c['type_id']==54) return c['value']; // Type ID Min speiding kontaktfelt
            else return null;
        }).filter(e => e != null);

        req.session.user['app_access'] = app_access;
        req.session.user['full_name'] = profile_request.data['first_name'] + " " + profile_request.data['last_name'];
        result.app_access = app_access;

    } catch (error) {
        rollbar.error(error, req)
        return res.status(500).json({ step: 'profile', message: error.message })
    }


    // Log new user
    /*if(typeof store.get('loggedin.' + result.member.member_no) == 'undefined'){
        rollbar.info('Ny innlogging: ' + result.member.member_no);
        store.put('loggedin.' + result.member.member_no, true);
    }*/


    // Get user's memberships
    try {
        const membership_request = await axios.get(scoutneturl + '/api/get/memberships', {
            headers: {
                'Authorization': 'Bearer ' + scoutnet_token
            }
        })

        result.memberships = membership_request.data

    } catch (error) {
        rollbar.error(error, req)
        return res.status(500).json({ step: 'memberships', message: error.message })
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