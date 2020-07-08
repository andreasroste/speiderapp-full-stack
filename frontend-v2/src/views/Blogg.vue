<template>
    <v-container>
        <h1>Om appen</h1>
        <v-tabs center-active centered color="primary" show-arrows>
            <v-tab key="1">Denne versjonen</v-tab>
            <v-tab key="2">Neste versjon</v-tab>
            <v-tab key="3">Forslag</v-tab>
            <v-tab key="4">Kontakt</v-tab>

            <v-tabs-slider></v-tabs-slider>

            <v-tab-item key="1">
                <v-card flat tile>
                    <v-card-title>Denne versjonen (beta-v0.3)</v-card-title>
                    <v-card-text>
                        Nye funksjoner i denne versjonen:
                        <ul>
                            <li>Startside med snarveier basert på brukerens roller i Min speiding.</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="2">
                <v-card flat tile>
                    <v-card-title>
                        Neste versjon (beta-v0.4)
                    </v-card-title>
                    <v-card-text>
                        Planen for beta-v0.4 er ikke planlagt enda.
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="3">
                <v-card flat tile>
                    <v-card-title>
                        Forslag
                    </v-card-title>
                    <v-card-text>
                        Forslag til forbedring kan legges inn her.
                        <br>
                        <v-btn color="primary" block ripple x-large href="https://docs.google.com/forms/d/e/1FAIpQLSdq_mcc2JJTA1q1sBwhxnLfF1UtIcVg0CybxA-fxb2npl02UQ/viewform">Google-skjema (ekstern lenke)</v-btn>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="4">
                <v-card flat tile>
                    <v-card-title>
                        Kontakt
                    </v-card-title>
                    <v-card-text>
                        <v-card>
                            <v-card-title><h6>Andreas Røste</h6></v-card-title>
                            <v-card-text>
                                <b>Prosjektleder / utvikler</b><br>
                                E-post: andreas.roste@speiding.no
                            </v-card-text>
                        </v-card>
                        <v-card>
                            <v-card-title><h6>Line Aas Mjøster</h6></v-card-title>
                            <v-card-text>
                                <b>Prosjekteier på forbundskontoret</b><br>
                                E-post: line.aas.mjoster@speiding.no
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>