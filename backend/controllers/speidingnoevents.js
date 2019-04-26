const axios = require('axios');

// Denne funksjonen henter ID-er for noder fra speiding.no/arrangementer.
// Den er nødvendig for å hente arrangementene. (Idiotisk, spør du meg...)
async function make_id_request() {
    const idag = new Date();
    const idag_iso = idag.toISOString();
    const omtusenaar_iso = new Date(new Date().setFullYear(idag.getFullYear() + 1000)).toISOString();
    let ids_raw = 0;
    try {
        ids_raw = await axios.get(`https://admin.speiding.no/api/search/empty?_format=json&fq[]=ds_field_event_start_date:[` + encodeURI('"' + idag_iso + '" TO "' + omtusenaar_iso + '"') + `]&type=event&sort=ds_field_event_start_date%20asc&facet=true&facet.field[]=itm_field_locat&facet.field[]=itm_field_age_group&facet.field[]=itm_field_type&facet.field[]=itm_field_keywords&start=0&`);
    } catch (e) {
        return false;
    }

    const pages = Math.ceil(ids_raw.data.total / 10); // Antall sider på speiding.no/arrangementer

    let nodes = [];

    for (let i = 0; i < pages; i++) { // Går gjennom alle arrangementene på alle sidene (vanligvis 1, 2 og 3)
        try {
            let nextpage = await axios.get(`https://admin.speiding.no/api/search/empty?_format=json&fq[]=ds_field_event_start_date:[` + encodeURI('"' + idag_iso + '" TO "' + omtusenaar_iso + '"') + `]&type=event&sort=ds_field_event_start_date%20asc&facet=true&facet.field[]=itm_field_locat&facet.field[]=itm_field_age_group&facet.field[]=itm_field_type&facet.field[]=itm_field_keywords&start=` + (i * 10));
            nodes.push(nextpage.data.nodes);    // Legger alle nodene på siden inn i "nodes". (Lager en array for hver side)
        }catch(e){
            return false;
        }

    }


    nodes = [].concat.apply([], nodes);   // Flater ut arrayen så hvert element er en node.

    let node_ids = [];
    for (const node in nodes) {
        if (nodes.hasOwnProperty(node)) {
            const element = nodes[node];
            node_ids.push(element.nid);
        }
    }
    return node_ids.join(',');
}

async function make_events_request(node_ids) {
    const events_raw = await axios.get('https://admin.speiding.no/api/nullsju/nodes/' + node_ids + '?_format=json');
    const events = events_raw.data

    if (!events) return false;

    let final_events = [];

    for (const event in events) {
        if (events.hasOwnProperty(event)) {
            const element = events[event];
            let age_groups = [];

            if(element.hasOwnProperty('field_age_group')){
                for(age_id in element.field_age_group){
                    const age_group = element.field_age_group[age_id] || null;
                    if(age_group && age_group.hasOwnProperty('id')){
                        age_groups.push(age_group.id['0'].value);
                    }
                }
            }

            const relevant_event_info = {
                id: (typeof element.id["0"] === 'undefined') ? 0 : element.id["0"].value,
                title: (typeof element.title["0"] === 'undefined') ? '' : element.title["0"].value,
                position: (typeof element.field_address["0"] === 'undefined') ? '' : element.field_address["0"].value,
                start_date: (typeof element.field_event_start_date["0"] === 'undefined') ? '' : new Date(element.field_event_start_date["0"].value),
                end_date: (typeof element.field_event_end_date["0"] === 'undefined') ? '' : new Date(element.field_event_end_date["0"].value),
                body: (typeof element.field_body["0"] === 'undefined') ? '' : element.field_body["0"].processed,
                desc: (typeof element.field_desc["0"] === 'undefined') ? '' : element.field_desc["0"].value,
                img_url: (typeof element.field_image["0"] === 'undefined' || typeof element.field_image["0"].path["0"] === 'undefined') ? '' : element.field_image["0"].path["0"].url,
                registration: (typeof element.field_event_registration["0"] === 'undefined') ? '' : element.field_event_registration["0"].url,
                age_groups,
                fee: (typeof element.field_event_fee["0"] === 'undefined') ? '' : element.field_event_fee["0"].value
            }
            final_events.push(relevant_event_info);
        }
    }

    final_events.sort((a,b) => {
        if(a.start_date.getTime() < b.start_date.getTime()) return -1;
        if(a.start_date.getTime() > b.start_date.getTime()) return 1;
        if(a.start_date.getTime() == b.start_date.getTime()) return 0;
    })

    return final_events;
}

module.exports = async (req, res) => {
    const node_ids = await make_id_request();
    if (node_ids) {
        const events = await make_events_request(node_ids);
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(500).status({ error: 'get_events.js, make_events_request()' });
        }
    } else {
        res.status(500).status({ error: 'get_events.js, make_id_request()' });
    }
};