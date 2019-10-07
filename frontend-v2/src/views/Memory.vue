<template>
    <v-container>
         <h1>Memory</h1>
            <p>Bli kjent med Speiderstyret!</p>
            <div class="dtable">
                <v-card class="pa-2 kloss" v-for="(item, id) in random" :key="id" width="25vw" height="25vw" @click.native="flip(item, id)" :elevation="item.done ? 20 : 2">
                    <div v-show="item.flipped">
                        <v-img v-if="item.image" :src="item.src"></v-img>
                        <h3 v-if="!item.image">{{ item.content }}</h3>
                    </div>
                </v-card>
            </div>
    </v-container>    
</template>

<style scoped>
.kloss {
    display: inline-block;
    margin: 2vw;
    vertical-align: top;
}
.dtable {
    width: 100%;
}
</style>

<script>
export default {
    data() {
        return {
            items: [
                {
                    // Håvard
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/H%C3%A5vard_0.jpg?itok=V3ochdeu",
                    flipped: false,
                    matchid: 1,
                    done: false
                },
                {
                    // Håvard
                    image: false,
                    content: "Håvard",
                    flipped: false,
                    matchid: 1,
                    done: false
                },
                {
                    // Birdy
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Birgitte_0.jpg?itok=WYOgNHgZ",
                    flipped: false,
                    matchid: 2,
                    done: false
                },
                {
                    // Birdy
                    image: false,
                    content: "Birdy",
                    flipped: false,
                    matchid: 2,
                    done: false
                },
                {
                    // Ane
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Ane.jpg?itok=SY7x2bzk",
                    flipped: false,
                    matchid: 3,
                    done: false
                },
                {
                    // Ane
                    image: false,
                    content: "Ane",
                    flipped: false,
                    matchid: 3,
                    done: false
                },
                {
                    // Eirik
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Eirik_0.jpg?itok=GG444wb1",
                    flipped: false,
                    matchid: 4,
                    done: false
                },
                {
                    // Eirik
                    image: false,
                    content: "Eirik",
                    flipped: false,
                    matchid: 4,
                    done: false
                },
                {
                    // Ole Christian
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Ole%20Christian_0.jpg?itok=nidlyHQe",
                    flipped: false,
                    matchid: 5,
                    done: false
                },
                {
                    // Ole Christian
                    image: false,
                    content: "Ole Christian",
                    flipped: false,
                    matchid: 5,
                    done: false
                },
                {
                    // Peer-Johan
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Peer%20Johan_0.jpg?itok=h-6xPEU1",
                    flipped: false,
                    matchid: 6,
                    done: false
                },
                {
                    // Peer-Johan
                    image: false,
                    content: "Peer-Johan",
                    flipped: false,
                    matchid: 6,
                    done: false
                },
                {
                    // Silje
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Silje_0.jpg?itok=FbWbywd2",
                    flipped: false,
                    matchid: 7,
                    done: false
                },
                {
                    // Silje
                    image: false,
                    content: "Silje",
                    flipped: false,
                    matchid: 7,
                    done: false
                },
                {
                    // Henrik
                    image: true,
                    src: "https://admin.speiding.no/sites/default/files/styles/contact_person/public/bilder/kontaktpersoner/Speiderstyret%202018-2020/Henrik_0.jpg?itok=F1q8uCQf",
                    flipped: false,
                    matchid: 8,
                    done: false
                },
                {
                    // Henrik
                    image: false,
                    content: "Henrik",
                    matchid: 8,
                    done: false
                }

            ],
            random: [],
            first: 0,
            firstItem: null,
            pause: false
        }
    },
    mounted() {
        this.random = this.shuffle(this.items);
    },
    methods: {
        shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
        flip(item, id){
            const vm = this;

            if(this.pause) return;
            if(this.firstId == id) return;
            if(item.done) return;

            if(this.first == 0){
                // Første trykk
                this.first = item.matchid;
                this.firstId = id;
                this.firstItem = item;
                item.flipped = true;
            }else{
                // Andre trykk
                if(item.matchid == this.first){
                    // Riktig!
                    this.first = 0;
                    this.firstId = -1;
                    item.flipped = true;
                    item.done = true;
                    this.firstItem.done = true;
                }else{
                    // Feil
                    this.first = 0;
                    this.firstId = -1;
                    item.flipped = true;
                    this.pause = true;
                    setTimeout(() => {
                        item.flipped = false;
                        vm.firstItem.flipped = false;
                        vm.pause = false;
                    }, 2000);
                }
            }
        }
    }
}
</script>