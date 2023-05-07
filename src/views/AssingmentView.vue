<template>
  <div id="Assingments">
    <button id="Assig" v-for="(assigment, index) in Assingments">
        <h1 id="Done" v-if="Perfor[index] == '1'">{Assingments[index]}}</h1>
        <h1 id="Progress">{{Assingments[index]}}</h1>
    </button>

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
        }
    },
}
</script>