const axios = require('axios');

module.exports = async (req, res, next) => {
    let event_raw = {};
    try {
        if(req.params.id){
            event_raw = await axios.get('https://admin.speiding.no/api/nullsju/nodes/' + req.params.id + '?_format=json');
            event_raw = event_raw.data;
            let result = {}
            result.name = (typeof event_raw.title["0"] !== 'undefined') ? event_raw.title["0"].value : '';
            result.desc = (typeof event_raw.field_desc["0"] === 'undefined') ? '' : event_raw.field_desc["0"].value;
            result.body = (typeof event_raw['field_body']['0'] !== 'undefined') ? event_raw['field_body']['0']['processed'] : '';
            result.fee = (typeof event_raw['field_event_fee']['0'] !== 'undefined') ? event_raw['field_event_fee']['0']['value'] : '';
            result.location = (typeof event_raw['field_address']['0'] !== 'undefined') ? event_raw['field_address']['0']['value'] : '';
            result.registration_link = (typeof event_raw['field_event_registration']['0'] !=='undefined') ? event_raw['field_event_registration']['0']['url'] : '';
            result.image_url = (typeof event_raw.field_image["0"] === 'undefined' || typeof event_raw.field_image["0"].path["0"] === 'undefined') ? '' : event_raw.field_image["0"].path["0"].url;
            result.start_date = (typeof event_raw.field_event_start_date["0"] === 'undefined') ? '' : new Date(event_raw.field_event_start_date["0"].value);
            result.end_date = (typeof event_raw.field_event_end_date["0"] === 'undefined') ? '' : new Date(event_raw.field_event_end_date["0"].value);
            res.status(200).json(result);
        }else{
            res.status(500).json({error: 'id not specified'});
        }
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
}