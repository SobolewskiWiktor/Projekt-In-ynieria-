<template>
  <div id="Assingments">
    <button id="Assig" v-for="(Assigment, index) in Assigments">
        <h1 id="Done" v-if="Perfor[index] == '1'">{{Assigment[index]}}</h1>
        <h1 id="Progress" v-else>{{Assigment[index]}}</h1>
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
        console.log("pobieram name")
        this.getProjectName()
        console.log("pobieram ID")
        this.getFullProject()
    },
    methods:
    {
        async getProjectName()
        {
            let result = await axios.get("http://127.0.0.1:300/getProjectName")
            console.log(result)
            this.projectName = result.data.Name;
            console.log("Loaded project name")
        },
        async getTaskID()
        {
            let Project = {
                Name:this.projectName,
            }
            let result = await axios.post("http://127.0.0.1:300/getTaskID", {Project})
            console.log(result)
            this.projectID = result.data.TaskID;
        },
        async getFullProject()
        {
           this.getTaskID()
           let Project = {
             Name: this.projectName,
             ID: this.projectID,
           }
           let result = await axios.post("http://127.0.0.1:300/getAssingment", {Project})
           console.log(result)
           this.Assingments = result.data.Assigment;
           this.Perfor = result.data.Performance; 
           console.log("Pobrano"); 
        }
    },
}
</script>