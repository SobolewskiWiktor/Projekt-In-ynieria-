<template>
<div id="workerDetailConent">
    <h1> worker details site for {{this.userLogin}}</h1>
</div>
</template>
<script>
import '@/assets/workerDetail.css'
import '@/assets/AssingmentView.css'
import { useToast } from "vue-toastification"
import axios from 'axios'

export default{
    data()
    {
        return{
           userName: '',
           userLogin: '',
           userSurname: '',
           userTasks:[],
           userProjects: [],
        }
    },
    mounted() 
    {
        this.setup();
    },
    methods:
    {
       async getWorker()
       {
          let result = await axios.get('http://127.0.0.1:300/getUser');
          this.userLogin = result.data.Name;
       },
       async setup()
       {
           await this.getWorker(); 
       }
    },
}
</script>