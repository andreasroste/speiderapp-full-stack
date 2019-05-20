<template>
    <v-container>
    <div>
        <v-btn @click="$router.go(-1)" absolute top left fab id="back_btn">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <h1 class="font-weight-thin">Nytt arrangement</h1>
        <br>
        <v-stepper vertical v-model="e1">

            <v-stepper-step :complete="e1 > 1" step="1" :editable="e1 > 1">Hvem skal ha arrangementet?</v-stepper-step>
            <v-stepper-content step="1">
                <v-radio-group v-model="memtype" @change="e1 = 2">
                    <v-radio label="Hønefoss speidergruppe" value="4501"></v-radio>
                    <v-radio label="Betalt arrangement" value="paid"></v-radio>
                </v-radio-group>
                <v-btn @click="e1 = 2">Videre</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 2" step="2" :editable="e1 > 2">Velg arrangementstype</v-stepper-step>
            <v-stepper-content step="2">
                <v-radio-group v-model="type" @change="e1 = 3">
                    <v-radio label="Gratisarrangement" value="free"></v-radio> <!-- Legg inn betalingsarrangement -->
                    <p class="caption">Dette er det eneste alternativet. Vi jobber med arrangementer med betaling gjennom Vipps.</p>
                    <!-- <v-radio label="Betalt arrangement" value="paid"></v-radio> -->
                </v-radio-group>
                <v-btn @click="e1 = 3">Videre</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 3" step="3" :editable="e1 > 3">{{type == 'paid' ? 'Pris og detaljer' : 'Detaljer'}}</v-stepper-step>
            <v-stepper-content step="3">
                <v-text-field v-model="event_name" label="Arrangementets navn" required></v-text-field>
                <v-text-field v-model="event_place" label="Sted" required></v-text-field>
                <v-text-field v-model="event_desc" label="Beskrivelse" required></v-text-field>
                <v-btn @click="e1 = 4" :disabled="!event_name || !event_place || !event_desc">Videre</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 4" step="4" :editable="e1 > 4">Tid og sted</v-stepper-step>
            <v-stepper-content step="4">
                <v-date-picker v-model="event_date" first-day-of-week="1" landscape reactive full_width></v-date-picker><br>
                <v-time-picker format="24hr" scrollable class="mt-3" v-model="event_time" full_width></v-time-picker><br>
                <v-btn @click="e1 = 5">Videre</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 5" step="5">Se over før du publiserer</v-stepper-step>
            <v-stepper-content step="5">
                <table>
                    <tbody>
                        <tr>
                            <td>Arrangementets navn</td>
                            <td>{{ event_name }}</td>
                        </tr>
                        <tr>
                            <td>Arrangementets eier</td>
                            <td>{{ memtype }}</td>
                        </tr>
                        <tr>
                            <td>Arrangementstype</td>
                            <td>{{ type }}</td>
                        </tr>
                        <tr>
                            <td>Tid</td>
                            <td>{{ event_date + ' ' + event_time }}</td>
                        </tr>
                        <tr>
                            <td>Sted</td>
                            <td>{{ event_place }}</td>
                        </tr>
                        <tr>
                            <td>Beskrivelse</td>
                            <td>{{ event_desc }}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <v-btn @click="e1 = 1" color="green">Ferdig. Tilbake til start.</v-btn>
            </v-stepper-content>
        </v-stepper>
    </div>
	</v-container>
</template>

<script>

export default {
    data(){
        return {
            e1: 0,
            type: 'free',
            memtype: '',
            event_name: '',
            event_date: new Date().toISOString().substr(0, 10),
            event_time: '12:00',
            event_place: '',
            event_desc: ''
        }
    }
}

</script>

<style scoped>
	#back_btn {
		top: auto;
		height: 47px;
		width: 47px;
	}
</style>
