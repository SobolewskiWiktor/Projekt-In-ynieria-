<template>
  <div id="contentAssig">
    <div id="Assingments" v-if="showDone == 0"> 
    <button id="Assig" v-for="(assigment, index) in Assingments" @click.prevent="Done(Assingments[index])">
        <h1 id="Done" v-if="Perfor[index] == '1'">{{Assingments[index]}}</h1>
        <h1 id="Progress" v-else>{{Assingments[index]}}</h1>
    </button>

  </div>
  <div id="Assingments" v-else> 
    <div id="blured">
        <button id="Assig2" v-for="(assigment, index) in Assingments" on-click="showDone()">
        <h1 id="Done2" v-if="Perfor[index] == '1'">{{Assingments[index]}}</h1>
        <h1 id="Progress2" v-else>{{Assingments[index]}}</h1>
    </button>
    </div>
    <div id="form">
       <div id="formTitle">
          <div id="formTitleText">Task completion</div>
          <button id="close" @click.prevent="closeDone()">X</button>
       </div>
       <div id="formRest">
         <form id="formWorker2">
            <input class="inputWorker" placeholder="User Name" v-model="userName">
            <input class="inputWorker" placeholder="Time" v-model="userHours">
            <button id="Add" @click.prevent=" Compelte() ">COMPLETE</button>
         </form>
       </div>
    </div>
  </div>
  </div>
</template>

<script>
import '@/assets/AssingmentView.css'
import { useToast } from "vue-toastification"
import axios from 'axios'

export default{
    data()
    {
        return{
        projectName : '',
        projectID: '',
        Assingments: [],
        Perfor: [],
        showDone: 0, 
        userName: '',
        userHours: '',
        selectAssingment: '',
        }
    },
    mounted() 
    {
         this.Setup();
    },
    methods:
    {
        async getProjectName()
        {
            console.log("BACK| PORBIERAM NAZWE")
            let result = await axios.get("http://127.0.0.1:300/getProjectName")
            console.log(result)
            this.projectName = result.data.Name;
            console.log("BACK| KONIEC POBIERANIA NAZWY")
        },
        async getTaskID()
        {
            console.log("BACK| PORBIERAM ID")
            let Project = {
                Name:this.projectName,
            }
            let result = await axios.post("http://127.0.0.1:300/getTaskID", {Project})
            console.log(result)
            this.projectID = result.data.TaskID;
            console.log("POBRAŁEM ID: ",result.data.TaskID )
        },
        async getFullProject()
        {
            console.log("BACK| PORBIERAM CALY PROJEKT")
           let Project2 = {
             Name: this.projectName,
             ID: this.projectID,
           }
           console.log (Project2);
           console.log("Project ID: ", this.projectID)
           let result = await axios.post("http://127.0.0.1:300/getAssingment", {Project2})
           console.log(result)
           this.Assingments = result.data.Assingments;
           this.Perfor = result.data.Performance; 
           console.log("Pobrano"); 
           console.log("TEST| assi: ", this.Assingments)
           console.log("TEST| per: ", this.Perfor)
        },
        async Setup()
        {
            await this.getProjectName();
            await this.getTaskID();
            await this.getFullProject();
        },
        async Done(assingment)
        {
            console.log("wlaczam dodanie done")
            this.showDone = 1; 
            this.selectAssingment = assingment; 
        },
        async closeDone()
        {
            this.showDone = 0; 
            this.Setup(); 
        },
        async Compelte()
        {
            let Complete =
            {
                AsigName: this.selectAssingment,
                userLogin: this.userName,
                hours: this.userHours
            };
            console.log('complete: ', Complete)
            const result = await axios.post("http://127.0.0.1:300/CompleteAssingment", {Complete})
            console.log("RES: ", result)
        }
    },
}
</script>