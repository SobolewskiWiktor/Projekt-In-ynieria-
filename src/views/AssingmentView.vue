<template>
 <h1>Project: {{projectName}}</h1>
</template>

<script>
import '@/assets/dashboard.css'
import { useToast } from "vue-toastification"
import axios from 'axios'

export default{
    data()
    {
        return{
        projectName : '',

        }
    },
    mounted() 
    {
        this.getProjectName()
    },
    methods:
    {
        async getProjectName()
        {
            let result = await axios.get("http://sobol.cloud:1808/getProjectName")
            console.log(result)
            this.projectName = result.data.Name;
            console.log("Loaded project name")
        }
    },
}
</script>