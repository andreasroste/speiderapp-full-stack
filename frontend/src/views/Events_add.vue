<template>
    <v-container>
    <div>
        <v-btn @click="$router.go(-1)" absolute top left fab id="back_btn">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <h1>Nytt arrangement</h1>
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
                    <v-radio label="Gratisarrangement" value="free"></v-radio>
                    <v-radio label="Betalt arrangement" value="paid"></v-radio>
                </v-radio-group>
                <v-btn @click="e1 = 3">Videre</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 3" step="3" :editable="e1 > 3">{{type == 'paid' ? 'Pris og detaljer' : 'Detaljer'}}</v-stepper-step>
            <v-stepper-content step="3">
                <v-text-field v-model="event_name" label="Arrangementets navn" required></v-text-field>
                <v-btn @click="e1 = 4" :disabled="!event_name">Videre</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 4" step="4">Se over før du publiserer</v-stepper-step>
            <v-stepper-content step="4">
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
            type: '',
            memtype: '',
            event_name: ''
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
