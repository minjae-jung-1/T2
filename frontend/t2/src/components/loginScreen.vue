<template>
  <div class="appBackground pt-1">
    <form class="form-signin">
      <img
        class="mb-4 brain"
        src="../assets/pepe2.png"
        alt
        width="100"
        height="100"
      />
      <h1 class="h3 mb-3 font-weight-normal brain">Please sign in</h1>
      <input
        v-model="user.email"
        id="inputEmail"
        type="email"
        class="form-control"
        placeholder="Email"
        required
        autofocus
      />
      <input
        v-model="user.username"
        id="inputUsername"
        class="form-control d-none"
        placeholder="Username"
        required
        autofocus
      />
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
        <label style="padding-left: 20%">
          <input @click="selectTrue()" type="checkbox" value="remember-me" />
          Sign Up
        </label>
      </div>
      <button
        id="signinButton"
        @click="loginUser()"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        Sign in
      </button>
      <button
        id="signupButton"
        @click="createUser()"
        class="btn btn-lg btn-info btn-block d-none"
        type="submit"
      >
        Sign up
      </button>
      <p id="date" class="mt-5 mb-3 text-muted"></p>
    </form>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "loginPage",
  data: function() {
    return {
      signUp: false,
      user: {
        username: "",
        password: ""
      },
      returnData: ""
    };
  },
  methods: {
    async loginUser() {
      var data = {
        email: this.user.email,
        password: this.user.password
      };
      const res = await axios.post(
        "https://localhost:3000/api/users/signin",
        data,
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        sessionStorage.setItem("userData", JSON.stringify(res.data));
        this.$router.push("/home");
      }
    },
    async createUser() {
      var data = {
        email: this.user.email,
        username: this.user.username,
        password: this.user.password
      };
      if (data.email.includes("@")) {
        const res = await axios.post(
          "https://localhost:3000/api/users/signup",
          data,
          {
            withCredentials: true
          }
        );
        if (res.status === 200){
          console.log(res.data);
          sessionStorage.setItem("userData", JSON.stringify(res.data));
          this.$router.push("/home");
        }
      } else {
        console.log("Incorrect Email Format");
      }
    },
    getDate() {
      window.onload = function() {
        const today = new Date();
        var a = document.getElementById("date");
        a.innerText = `Property of BRAN MINJAE INC ${today.getFullYear()}`;
      };
    },
    selectTrue() {
      const usernameDiv = document.getElementById("inputUsername");
      const buttonDiv = document.getElementById("signupButton");
      const buttonDiv2 = document.getElementById("signinButton");
      if (this.signUp === true) {
        this.signUp = false;
        usernameDiv.classList.add("d-none");
        buttonDiv2.classList.remove("d-none");
        buttonDiv.classList.add("d-none");
      } else {
        this.signUp = true;
        usernameDiv.classList.remove("d-none");
        buttonDiv.classList.remove("d-none");
        buttonDiv2.classList.add("d-none");
      }
    }
  },
  created: function() {
    this.getDate();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.brain {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>