<template>
	<v-container>
		<h1>Gruppe</h1>
		<v-progress-circular
			indeterminate
			v-if="loading_site"
		></v-progress-circular>
		<v-alert type="warning" v-if="!loading_site && !groupmemberships">
			Du er ikke medlem av noen speidergrupper.
		</v-alert>
		<v-card
			v-for="group in groupmemberships"
			class="group-card"
			:key="group.id"
		>
            <v-card-title>{{group.name}}</v-card-title>
            <v-card-text>
                <span>Du ble medlem for {{getMembershipDuration(group.confirmed_at)}}!</span><br>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Ledere</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <strong>Gruppeleder</strong>: {{getGroupLeader(group.role_members).name | aeoeaa}}<br>
                            <strong>Gruppestyret</strong>:
                            <ul>
                                <li v-for="member in getBoardMembers(group.role_members)" :key="member.member_no">{{member.name | aeoeaa}}</li>
                            </ul>
                            <br>
                            <strong>Alle ledere</strong>
                            <ul v-for="(leader, id) in group.role_members" :key="id">
                                <li>{{leader.name | aeoeaa}}</li>
                            </ul>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <div v-if="groupmembers.hasOwnProperty(group.id)">
                    <h2>Medlemmer</h2>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="member in groupmembers[group.id].members" :key="member.member_no">
                            <v-expansion-panel-header>
                                {{member.name | aeoeaa}}
                                <span style="color: #97282e;" v-if="member.police_check.summary != 'Gyldig' && member.police_check.required">&nbsp;(sjekk politiattest) </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr v-if="member.police_check.summary != 'Gyldig' && member.police_check.required">
                                                <td class="font-weight-bold">Politiattest</td>
                                                <td>
													<span style="color: #97282e;">Mangler</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">
													E-postadresse
													<v-btn fab x-small style="background: #63ac3b; color: #fff; margin-left: 10px;" :href="'mailto:' + member.primary_email"><v-icon dark>mdi-email</v-icon></v-btn>

												</td>
                                                <td>
													{{member.primary_email}}
												</td>
                                            </tr>
                                            <tr v-for="(info, id) in member.contact_info" :key="id">
                                                <td class="font-weight-bold">
													{{typeidtotype(info.type_id, group.id) | aeoeaa}}
													<v-btn fab x-small style="background: #63ac3b; color: #fff; margin-left: 10px;" :href="'tel:' + info.value" v-if="info.type_id == 1 || info.type_id == 2 || info.type_id == 34 || info.type_id == 35">
														<v-icon dark>mdi-phone</v-icon>
													</v-btn>
													<v-btn fab x-small style="background: #63ac3b; color: #fff; margin-left: 10px;" :href="'mailto:' + info.value" v-if="info.type_id == 13 || info.type_id == 15">
														<v-icon dark>mdi-email</v-icon>
													</v-btn>
												</td>
                                                <td>
													{{info.value | aeoeaa}}
												</td>
                                            </tr>
											<tr>
												<td class="font-weight-bold">Medlemsnummer</td>
												<td>{{member.member_no}}</td>
											</tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </v-card-text>
		</v-card>
	</v-container>
</template>

<style scoped>
.v-expansion-panels {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>

<script>
	const moment = require("moment");
	export default {
		data() {
			return {
				groupmemberships: {},
				groupmembers: {},
				loading_site: true,
				loading_groups: true
			};
		},
		mounted() {
			moment.locale("nb");

			let sessionstoredGroupmemberships = sessionStorage.getItem(
				"group_memberships"
			);
			if (sessionstoredGroupmemberships) {
				this.groupmemberships = JSON.parse(sessionstoredGroupmemberships);
				this.loading_site = false;
				this.getAllMembers();
			} else {
				// TODO: Bruk data fra vuex istedenfor å laste data to ganger.
				this.$http
					.get("/api/memberships")
					.then(response => {
						if (response.data.hasOwnProperty("group")) {
							this.groupmemberships = response.data.group;
							this.loading_site = false;
							sessionStorage.setItem(
								"group_memberships",
								JSON.stringify(response.data.group)
							);
						} else {
							this.groupmemberships = false;
							this.loading_site = false;
							sessionStorage.setItem("group_memberships", false);
						}
						this.getAllMembers();
					})
					.catch(() => {
						this.groupmemberships = false;
						// TODO: Gi feilmelding
					});
			}
		},
		methods: {
			getMembersInGroup(group_id) {
				let sessionstored_members_in_group = sessionStorage.getItem(
					"members_in_group_" + group_id
				);
				if (sessionstored_members_in_group) {
					this.groupmembers[group_id] = JSON.parse(
						sessionstored_members_in_group
					);
				} else {
					this.$http
						.get("/api/getmembers/group/" + group_id)
						.then(response => {
							sessionStorage.setItem(
								"members_in_group_" + group_id,
								JSON.stringify(response.data)
							);
							this.groupmembers[group_id] = response.data;
							this.$forceUpdate();
						}); // TODO: catch
				}
			},
			getAllMembers() {
				for (const groupid in this.groupmemberships) {
					if (this.groupmemberships.hasOwnProperty(groupid)) {
						this.getMembersInGroup(groupid);
					}
				}
			},
			typeidtotype(typeid, groupid) {
				return this.groupmembers[groupid].contact_types[typeid].label;
			},
			getGroupLeader(role_members) {
				return Object.values(role_members).find(member => {
					if (member.roles.hasOwnProperty(1)) return true;
					else return false;
				});
			},
			getBoardMembers(role_members) {
				return Object.values(role_members).filter(member => {
					if (member.roles.hasOwnProperty(2)) return true;
					else return false;
				});
			},
			getMembershipDuration(date_joined) {
				return moment(date_joined).fromNow();
			}
		},
		filters: {
			aeoeaa(text) {
				let textarea = document.createElement("textarea");
				textarea.innerHTML = text;
				return textarea.innerText;
			}
		}
	};
</script>