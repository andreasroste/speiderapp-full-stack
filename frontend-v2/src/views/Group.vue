<template>
	<div class="page">
		<h1>Gruppe</h1>
		<v-progress-circular
			indeterminate
			v-if="loading_site"
		></v-progress-circular>
		<v-card
			v-for="group in groupmemberships"
			class="group-card"
			:key="group.id"
		>
			<v-card-text>
				<h1>{{ group.name }}</h1>
				<span class="center"
					>Du ble medlem for
					{{ getMembershipDuration(group.confirmed_at) }}!</span
				><br />
				<v-expansion-panel>
					<v-expansion-panel-content>
						<template v-slot:header>
							<div>
								Ledere
							</div>
						</template>
						<v-card>
							<v-card-text>
								<strong>Gruppeleder</strong>:
								{{
									getGroupLeader(group.role_members).name
										| aeoeaa
								}}<br />
								<strong>Gruppestyret</strong>:
								<ul>
									<li
										v-for="member in getBoardMembers(
											group.role_members
										)"
										:key="member.member_no"
									>
										{{ member.name | aeoeaa }}
									</li>
								</ul>
								<br />
								<strong>Alle ledere</strong>
								<ul
									v-for="(leader, id) in group.role_members"
									:key="id"
								>
									<li>{{ leader.name | aeoeaa }}</li>
								</ul>
							</v-card-text>
						</v-card>
					</v-expansion-panel-content>
					<v-expansion-panel-content>
						<template v-slot:header>
							<div>
								Informasjon
							</div>
						</template>
						<v-card>
							<v-card-text>
								<v-icon>home</v-icon>
								{{ group.address.address_line1 || "" }}
							</v-card-text>
						</v-card>
					</v-expansion-panel-content>
					<v-expansion-panel-content>
						<template v-slot:header>
							<div>
								Deg og ditt
							</div>
						</template>
						<v-card>
							<v-card-text>
								<v-icon>business</v-icon><strong>Enhet</strong>:
								{{ group.troop.name || "N/A" }}<br />
								<v-icon>face</v-icon
								><strong>Ledere i enheten</strong>
								<ul>
									<i>
										<li
											v-for="(leader, id) in group.troop
												.role_members"
											:key="id"
										>
											{{ leader.name | aeoeaa }}
										</li>
									</i>
								</ul>
								<v-icon>people</v-icon
								><strong>Patrulje</strong>:
								{{ group.patrol.name | aeoeaa || "N/A" }}<br />
								<v-icon>face</v-icon
								><strong>Ledere i patruljen</strong>
								<ul>
									<i>
										<li
											v-for="(leader, id) in group.patrol
												.role_members"
											:key="id"
										>
											{{ leader.name | aeoeaa }}
										</li>
									</i>
								</ul>
							</v-card-text>
						</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>

				<div v-if="groupmembers.hasOwnProperty(group.id)">
					<h2>Medlemmer</h2>
					<v-expansion-panel>
						<v-expansion-panel-content
							v-for="member in groupmembers[group.id].members"
							:key="member.member_no"
						>
							<template v-slot:header>
								<div>
									<span class="grey--text"
										>[{{ member.member_no }}]</span
									>
									{{ member.name | aeoeaa }}
									<span
										style="color: #97282e;"
										v-if="
											member.police_check.summary !=
												'Gyldig' &&
												member.police_check.required
										"
										>(sjekk politiattest)
									</span>
								</div>
							</template>
							<v-card>
								<v-card-text>
									<h3>{{ member.name | aeoeaa }}</h3>
									<table>
										<tbody>
											<tr>
												<td class="font-weight-bold">
													Politiattest
												</td>
												<td>
													<span
														v-if="
															!member.police_check
																.required
														"
														style="color: #63ac3b;"
														>Trengs ikke. Alt i
														orden :)</span
													>
													<span
														v-if="
															member.police_check
																.required
														"
													>
														<span
															v-if="
																member
																	.police_check
																	.summary ==
																	'Gyldig'
															"
															><span
																style="color: #63ac3b;"
																>Alt i orden!
																:)</span
															></span
														>
														<span
															v-if="
																member
																	.police_check
																	.summary !=
																	'Gyldig'
															"
															><span
																style="color: #97282e;"
																>Mangler</span
															></span
														>
													</span>
												</td>
											</tr>
											<tr>
												<td class="font-weight-bold">
													E-postadresse
												</td>
												<td>
													{{ member.primary_email }}
												</td>
												<td>
													<v-btn
														fab
														small
														style="background: #63ac3b; color: #fff;"
														:href="
															'mailto:' +
																member.primary_email
														"
														><v-icon dark
															>email</v-icon
														></v-btn
													>
												</td>
											</tr>
											<tr
												v-for="(info,
												id) in member.contact_info"
												:key="id"
											>
												<td class="font-weight-bold">
													{{
														typeidtotype(
															info.type_id,
															group.id
														) | aeoeaa
													}}
												</td>
												<td>
													{{ info.value | aeoeaa }}
												</td>
												<td
													v-if="
														info.type_id == 1 ||
															info.type_id == 2 ||
															info.type_id ==
																34 ||
															info.type_id == 35
													"
												>
													<v-btn
														fab
														small
														style="background: #63ac3b; color: #fff;"
														:href="
															'tel:' + info.value
														"
														><v-icon dark
															>call</v-icon
														></v-btn
													>
												</td>
												<td
													v-if="
														info.type_id == 13 ||
															info.type_id == 15
													"
												>
													<v-btn
														fab
														small
														style="background: #63ac3b; color: #fff;"
														:href="
															'mailto:' +
																info.value
														"
														><v-icon dark
															>email</v-icon
														></v-btn
													>
												</td>
												<td v-else></td>
											</tr>
										</tbody>
									</table>
								</v-card-text>
							</v-card>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
.group-card {
  margin-bottom: 20px;
}
.v-card {
  background-color: rgba(255, 255, 255, 0.5);
}
.center {
  text-align: center;
  display: block;
}
.page {
  width: 90vw;
  margin: 10px auto;
  max-width: 900px;
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
