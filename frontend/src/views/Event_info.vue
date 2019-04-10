<template>
    <div>
        <h1>{{ current_event.name }}</h1>
        <pre>
            {{current_event}}
        </pre>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['current_event'])
    }
}
</script>
