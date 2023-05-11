<template>
<div id="workerDetailConent">
    <div id="workerDetailTitle">
         <div id="workerName">
            {{this.userName}}  {{this.userSurname}}
         </div>
         <div id="workerType">
            {{this.userType}}
         </div>
    </div>
    <div id="workerDetailProjects">
        
    </div>
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
           userType: '',
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
       async getWorkerName()
       {
         let User2 = 
         {
            Name: this.userLogin,
         }
         let result = await axios.post(`http://127.0.0.1:300/getNameSurname`, {User2});
         this.userName = result.data.Name;
         this.userSurname = result.data.Surname;
         this.userType = result.data.Type;

       },
       async setup()
       {
           await this.getWorker();
           await this.getWorkerName(); 
       }
    },
}
</script>