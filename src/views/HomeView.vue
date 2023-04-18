<template>
  <div id="contentLogin">
     <div id="loginTop"></div>
     <div id="loginMiddle">
      <form id="LoginForm">
       <div id="loginRow"><img src="../components/icons/person-972.svg"><input class="inputLogin" type="text" placeholder="Login" v-model="Login"></div>
       <div id="loginRow"><img src="../components/icons/padlock-11723.svg"><input class="inputLogin" type="password" placeholder="Haslo" v-model="Password"></div>
       <button id="LoginButton" @click.prevent="Authorization()">Login</button>
      </form>
     </div>
     <div id="loginBottom">
      <h1>Wiktor Sobolewski & Maciej Zagdański 2023 ©</h1>
     </div>
  </div>
</template>

<script>
import '@/assets/login.css'
import axios from 'axios'
import { useToast } from "vue-toastification";
import router from "../router";
export default{
  name: "Login",
  data()
  {
    return{
      Login: '',
      Password: '', 
    }
  },
  methods:
  {
    async Authorization(){
      let user = {
        Login : this.Login,
        Password : this.Password,
      }
      let request = await axios.post("http://sobol.cloud:1808/login",{user})
      console.log(request)
      if(request.data.Loginstatus == "OK")
      {
        this.Logined = request.data.Loginlogin
        this.status = request.data.Loginstatus
        this.auth = true; 
      }
      if(this.auth == true)
        {
          this.toastService.success("Login Accept", {
          position: "top-center",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false
          })
          this.$router.push('/Dashboard')
        }
        else
        {
          this.toastService.error("Login Denied", {
          position: "top-center",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false
        });
        }
     },
    },
    mounted()
    {
      this.toastService = useToast();
    }
    }
</script>
