<template>
    <h1>På gjensyn</h1>
</template>

<script>

import store from '../store'

export default {
    mounted() {
        const vm = this
        store.dispatch('logout').then(() => {
            setTimeout(() => {
                vm.$router.push('/')
            }, 3000)
        })
    }
}
</script>
