<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="imgContainer"  @click="$refs.fileInput.click()">
            <img :src="user.avi" class="profile__image"/>
            <div class="middle">
                <div class="text">Change Avi</div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-6">
                  <form enctype="multipart/form-data">
                    <input class="d-none" @change="onFileSelected" type="file" ref="fileInput"/>
                  </form>
            </div>
        </div>
      <div class="row justify-content-center">
        <div class="form-group col-4">
            <label class="jcomponent-label" for="input-username">Username</label>
            <input id="input-username" class="form-control jcomponent-input" @change="updateUser('username', user.username)" v-model="user.username" type="text" aria-describedby="small-username" autocomplete="off"/>
            <small class="form-text text-muted jcomponent-small small-username"></small>
        </div>
        <div class="form-group col-4">
            <label class="jcomponent-label" for="input-email">Email</label>
            <input id="input-email" class="form-control jcomponent-input" disabled v-model="user.email" type="text" aria-describedby="small-email" autocomplete="off"/>
            <small class="form-text text-muted jcomponent-small small-email"></small>
        </div>
      </div>
      <div class="row justify-content-center">
          <div class="form-group col-4">
            <label class="jcomponent-label" for="${options.type}-input-${options.id}">Preferred Role (League)</label>
            <select v-model="user.league.role" @change="updateUser('league', user.league)" class="custom-select jcomponent-input ${options.type}-input" aria-describedby="${options.type}-small-${options.id}">
              <option  v-for="(role, index) in options.league.roles" :key="index" v-bind:value="typeof role.value === 'undefined' ? role.label : role.value">{{ role.label }}</option>
            </select>
          <small v-if="options.description" class="form-text text-muted jcomponent-small jdropdown-small">{{options.description}}</small>
        </div>
        <div class="form-group col-4">
            <label class="jcomponent-label" for="${options.type}-input-${options.id}">Current Rank (League)</label>
            <select v-model="user.league.rank" @change="updateUser('league', user.league)" class="custom-select jcomponent-input ${options.type}-input" aria-describedby="${options.type}-small-${options.id}">
              <option  v-for="(rank, index) in options.league.ranks" :key="index" v-bind:value="typeof rank.value === 'undefined' ? rank.label : rank.value">{{ rank.label }}</option>
            </select>
          <small v-if="options.description" class="form-text text-muted jcomponent-small jdropdown-small">{{options.description}}</small>
        </div>
      </div>
      <div class="row justify-content-center">
          <div class="form-group col-4">
            <label class="jcomponent-label" for="${options.type}-input-${options.id}">Preferred Role (CSGO)</label>
            <select v-model="user.csgo.role" @change="updateUser('csgo', user.csgo)" class="custom-select jcomponent-input ${options.type}-input" aria-describedby="${options.type}-small-${options.id}">
              <option  v-for="(role, index) in options.csgo.roles" :key="index" v-bind:value="typeof role.value === 'undefined' ? role.label : role.value">{{ role.label }}</option>
            </select>
          <small v-if="options.description" class="form-text text-muted jcomponent-small jdropdown-small">{{options.description}}</small>
        </div>
        <div class="form-group col-4">
            <label class="jcomponent-label" for="${options.type}-input-${options.id}">Current Rank (CSGO)</label>
            <select v-model="user.csgo.rank" @change="updateUser('csgo', user.csgo)" class="custom-select jcomponent-input ${options.type}-input" aria-describedby="${options.type}-small-${options.id}">
              <option  v-for="(rank, index) in options.csgo.ranks" :key="index" v-bind:value="typeof rank.value === 'undefined' ? rank.label : rank.value">{{ rank.label }}</option>
            </select>
          <small v-if="options.description" class="form-text text-muted jcomponent-small jdropdown-small">{{options.description}}</small>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
            <button type="button" @click="resetPassword" class="btn" :class="`btn-${options.passwordButton.button_type}`">
            <div class="text-truncate outer-btn">
            <span class="pr-1 btn-content"><i v-if="options.passwordButton.icon_group && options.passwordButton.icon_name" :class="`${options.passwordButton.icon_group} fa-${options.passwordButton.icon_name} text-${options.passwordButton.icon_color|| ''}`"></i></span><span class="btn-content"> {{options.passwordButton.label}}</span>
        </div>
      </button>
    </div>
      </div>
    </div>
</template>

<script>
// put Imports here
import axios from "axios";
export default {
    name: "profile",
    props: ["userId"],
    data() {
        return {
            image: undefined,
            user: {
                csgo: {
                    rank: "s1",
                    role: "awp"
                },
                league: {
                    role: "jungle",
                    rank: "s4"
                }
            },
            options: {
                league: {
                    roles: [{
                        label: "Mid",
                        value: "mid"
                    }, {
                        label: "Top",
                        value: "top"
                    }, {
                        label: "Jungle",
                        value: "jungle"
                    }, {
                        label: "Support",
                        value: "Support"
                    }, {
                        label: "AD Carry",
                        value: "adc"
                    }],
                    ranks: [{
                        label: "Iron 4",
                        value: "i4"
                    }, {
                        label: "Iron 3",
                        value: "i3"
                    }, {
                        label: "Iron 2",
                        value: "i2"
                    }, {
                        label: "Iron 1",
                        value: "i1"
                    }, {
                        label: "Bronze 4",
                        value: "b4"
                    }, {
                        label: "Bronze 3",
                        value: "b3"
                    }, {
                        label: "Bronze 2",
                        value: "b2"
                    }, {
                        label: "Bronze 1",
                        value: "b1"
                    }, {
                        label: "Silver 4",
                        value: "s4"
                    }, {
                        label: "Silver 3",
                        value: "s3"
                    }, {
                        label: "Silver 2",
                        value: "s2"
                    }, {
                        label: "Silver 1",
                        value: "s1"
                    }, {
                        label: "Gold 4",
                        value: "g4"
                    }, {
                        label: "Gold 3",
                        value: "g3"
                    }, {
                        label: "Gold 2",
                        value: "g2"
                    }, {
                        label: "Gold 1",
                        value: "g1"
                    }, {
                        label: "Platinum 4",
                        value: "p4"
                    }, {
                        label: "Platinum 3",
                        value: "p3"
                    }, {
                        label: "Platinum 2",
                        value: "p2"
                    }, {
                        label: "Platinum 1",
                        value: "p1"
                    }, {
                        label: "Diamond 4",
                        value: "d4"
                    }, {
                        label: "Diamond 3",
                        value: "d3"
                    }, {
                        label: "Diamond 2",
                        value: "d2"
                    }, {
                        label: "Diamond 1",
                        value: "d1"
                    }]
                },
                csgo: {
                    roles: [{
                        label: "Awp",
                        value: "awp"
                    }, {
                        label: "Entry",
                        value: "entry"
                    }, {
                        label: "Support",
                        value: "support"
                    }, {
                        label: "IGL",
                        value: "igl"
                    }, {
                        label: "Lurker",
                        value: "lurker"
                    }],
                    ranks: [{
                        label: "Silver I",
                        value: "s1"
                    },
                    {
                        label: "Silver II",
                        value: "s2"
                    },
                    {
                        label: "Silver III",
                        value: "s3"
                    },
                    {
                        label: "Silver IV",
                        value: "s4"
                    },
                    {
                        label: "Silver Elite",
                        value: "s5"
                    },
                    {
                        label: "Silver Elite Master",
                        value: "s6"
                    },
                    {
                        label: "Gold Nova I",
                        value: "g1"
                    },
                    {
                        label: "Gold Nova II",
                        value: "g2"
                    },
                    {
                        label: "Gold Nova III",
                        value: "g3"
                    },
                    {
                        label: "Gold Nova Master",
                        value: "g4"
                    },
                    {
                        label: "Master Guardian I",
                        value: "mg1"
                    },
                    {
                        label: "Master Guardian II",
                        value: "mg2"
                    },
                    {
                        label: "Master Guardian Elite",
                        value: "mge"
                    },
                    {
                        label: "Distinguished Master Guardian",
                        value: "dmg"
                    },
                    {
                        label: "Legendary Eagle",
                        value: "le"
                    },
                    {
                        label: "Legendary Eagle Master",
                        value: "lem"
                    },
                    {
                        label: "Supreme Master First Class",
                        value: "smfc"
                    },
                    {
                        label: "The Global Elite",
                        value: "ge"
                    }
                ]
              },
              passwordButton: {
                  icon_group: "fas",
                  icon_name: "unlock-alt",
                  button_type: "primary",
                  icon_color: "light",
                  label: "Change Password"
              }
            }
        }
    },
    methods: {
        async getProfile() {
            const res = await axios.get(`https://localhost:3000/api/users/${this.userId}`);
            if (res.status === 200){
                this.user = res.data;
            }
        },
        resetPassword() {
            console.log("reset password :DD");
        },
        updateUser(field, value) {
            let payload = {field, value};
            
            console.log(payload);
            axios.put(`https://localhost:3000/api/users/${this.userId}`,
                { payload }
            );
        },
        async onFileSelected(event) {
            console.log(event.target.files[0]);
            this.image = event.target.files[0];

            const fd = new FormData();
            fd.append("image", this.image, this.image.name);
            console.log("im so fkin triggered rn");
            await axios.post("https://localhost:3000/api/images/image-upload", fd)
                .then(res => {
                    console.log(res)
                });
        }
    },
    mounted() {
        this.getProfile();
        console.log("shit happenin?", this.userId);
        // anything you want to run on page load
    }
}
</script>

<style>
.profile__image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto 20px auto;
}

.imgContainer:hover .profile__image {
    cursor: pointer;
    opacity: 0.3;
}

.imgContainer:hover .middle {
    opacity: 1;
    cursor: pointer;
}

.imgContainer {
  position: relative;
}

.middle {
  transition: .2s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: black;
  font-size: 20px;
  padding: 16px 32px;
}
</style>