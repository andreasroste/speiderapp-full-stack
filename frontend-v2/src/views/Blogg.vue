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
                    <v-card-title>Denne versjonen (beta-v0.2)</v-card-title>
                    <v-card-text>
                        Nye funksjoner i denne versjonen:
                        <ul>
                            <li>Om-side (den du er på nå :))</li>
                            <li>Tabs for å bytte mellom gruppene hvis man er medlem i flere grupper.</li>
                            <li>Enhetsmarkeringer på arrangementene</li>
                            <li>Røde utropstegn - for å markere fare - på de som ikke har politiattesten i orden.</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="2">
                <v-card flat tile>
                    <v-card-title>
                        Neste versjon (beta-v0.3)
                    </v-card-title>
                    <v-card-text>
                        I neste versjon kan du vente deg;
                        <ul>
                            <li>Lista med medlemmer sorteres etter enheter og fornavn. (Det kan hende det også kommer en slags søkefunksjon)</li>
                            <li>Endre egne personopplysninger</li>
                        </ul>
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
                                E-post: andreas@rugge.org
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>