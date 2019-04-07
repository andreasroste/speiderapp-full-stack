<template>
    <div class="dockbar bg-leder">
        <router-link class="dockicon" to="/group"><img src="../assets/icons/gruppe.png" alt=""></router-link>
        <router-link class="dockicon" to="/events"><img src="../assets/icons/arrangementer.png" alt=""></router-link>
        <router-link class="dockicon" to="/404"><img src="../assets/icons/kalender.png" alt=""></router-link>
        <router-link class="dockicon" to="/"><img src="../assets/icons/profil.png" alt=""></router-link>
    </div>
</template>

<style scoped>
    a, a:visited, a:link, a:active, a:hover {
        color: black;
        text-decoration: none;
        font-size: 75%;
    }
    img {
        width: 35px;
        height: 35px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .dockbar {
        padding: 5px 0;
        height: 75px;
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        align-items: center;
    }
    .dockicon {
        background: rgba(255,255,255,.7);
        border-radius: 50%;
        padding: 10px;
        width: 50px;
        height: 50px;
        position: relative;
    }
</style>

<script>
export default {
    data() {
        return {}
    }
}
</script>
