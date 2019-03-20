<template>
    <v-navigation-drawer app>
        <v-toolbar>
            <v-toolbar-title>Speiderapp</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
            <v-list-tile v-for="item in accessibleRoutes" :key="item.id" :to="item.path">
                <v-list-tile-title>{{$t(item.meta.name)}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

import router from '../router'
import store from '../store'

let routes = router.options.routes

export default {
    data() {
        return {
            items: []
        }
    },
    computed: {
        accessibleRoutes() {
            let result = []
            for(const routeindex in routes){     // Every route
                const route = routes[routeindex]

                if(!route.hasOwnProperty('meta') ||
                    (route.meta.hasOwnProperty('navbar') && !route.meta.navbar)){
                    continue
                }

                if(!route.meta.hasOwnProperty('roleids')){
                    result.push(route)
                    continue
                }

                const routeroles = route.meta['roleids']
                const userroles = store.getters.user_role_ids
                for(const userroleindex in userroles){
                    const userroleid = userroles[userroleindex].roleid
                    if(!routeroles.includes(userroleid)){
                        continue
                    }else{
                        if(!result.includes(route)) result.push(route)
                    }
                }
            }
            return result
        }
    }
}
</script>
