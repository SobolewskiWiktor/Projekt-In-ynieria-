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
         <div id="Proejct" v-for="(project, index) in userProjects">
            {{userProjects[index][0]}}
             <div id="AssigName" v-for="(assig, index2) in userAssingments">
               <div id="contentAssig2" v-if="userAssingments[index2][1] == userProjects[index][1]" >
                  <div id="contentAssigImg"></div>
                  <div id="contentAssigText">
                     <div id="contentAssigTextTitle">{{userAssingments[index2][0]}}</div>
                     <div id="contentAssigHours">{{userAssingments[index2][2]}} H</div>
                  </div>
               </div>
            </div>
         </div>
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
           userID: '',
           userProjects:[],
           userAssingments:[],
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
       async getWorkerID()
       {
         let User = {
            Name: this.userLogin,
         }
         let result = await axios.post(`http://127.0.0.1:300/getUserID`, {User})
         this.userID = result.data.userID; 
       },
       async getAllProject()
       {
         let projectWithAssingment = [];
         let assingment = []; 
                 let Data = {
                  userID: this.userID,
                 }
            let result = await axios.post(`http://127.0.0.1:300/getAllProject`, {Data})
            result.data.Projects.forEach((elem, index, arr) => {
               projectWithAssingment[index] = elem; 
            })

            let result2 = await axios.post(`http://127.0.0.1:300/getAllAssingment`,{Data})
            result2.data.assig.forEach((elem, index, arr) => {
               assingment[index] = elem; 
            })
            console.log("Projects Arr: ", projectWithAssingment)
            console.log("Assig arr: ", assingment)
            this.userProjects = projectWithAssingment;
            this.userAssingments = assingment;
         },
       async setup()
       {
           await this.getWorker();
           await this.getWorkerName(); 
           await this.getWorkerID();
           await this.getAllProject();
       }
    },
}
</script>