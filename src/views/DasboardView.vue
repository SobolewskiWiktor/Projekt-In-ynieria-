<template>
    <div id="content">
        <div id="contentLeft">
            <div id="contentleftTop">
                <h1>BiedaJira</h1>
            </div>
            <div id="contentLeftRest">
                <button class="contentbarSelected" @click.prevent="Home" v-if="workers.length == 0 &&Projects.length == 0 ">Home</button>
                <button class="contentbar" @click.prevent="Home" v-else>Home</button>
                <button class="contentbarSelected" @click.prevent="getWorkers" v-if="workers.length != 0">Workers</button>
                <button class="contentbar" @click.prevent="getWorkers" v-else>Workers</button>
                <button class="contentbarSelected" @click.prevent="getProject" v-if="Projects.length != 0">Projects</button>
                <button class="contentbar" @click.prevent="getProject" v-else>Projects</button>
            </div>
        </div>
        <div id="contentRight">
            <div id="contentRightTop">
              <div id="title" v-if="workers.length != 0">Workers</div>
              <div id="title" v-else-if="Projects.length != 0">Projects</div>
              <div id="title" v-else>Home</div>
            </div>
            <div id="contentRightRest">
                
                <div id="workers" v-if="workers.length != 0">
                    <div id="selectOptionWarker">
                        <button id="selectOptionWarkerButtonFocus" v-if="showAddWorker == 0">LIST</button>
                        <button id="selectOptionWarkerButton" v-if="showAddWorker == 1" @click.prevent="closeAddWorker()">LIST</button>
                        <button id="selectOptionWarkerButton" v-if="showAddWorker == 0" @click.prevent="addWorker()">ADD</button>
                        <button id="selectOptionWarkerButtonFocus" v-if="showAddWorker == 1">ADD</button>
                    </div>
                    <div id="addWorker" v-if="showAddWorker == 1">
                       <form id="formWorker">
                         <input class="inputWorker" placeholder="Name" v-model="addName">
                         <input class="inputWorker" placeholder="Surname" v-model="addSurname">
                         <input class="inputWorker" placeholder="Login" v-model="addLogin">
                         <input type="password" class="inputWorker" placeholder="Password" v-model="addPassword">
                         <input class="inputWorker" placeholder="Type" v-model="addType">
                         <button id="Add" @click.prevent="AddWorkerToBase()">ADD</button>
                       </form>
                    </div>
                    <div id="showWorker" v-else>
                        <div id="list">
                            <div id="listSerch">
                                <form id="formWorker">
                            <input class="inputWorker" placeholder="Name" v-model="serch">
                            </form>
                            </div>
                            <div id="listList">
                                <button id="worker" v-for="(worker, index) in filterWorker" @click.prev
                                ="showWorkerDetail(filterWorker[index])">
                                <img id="workerImg" src="../components/icons/man.png">
                                <div id="name">{{filterWorker[index]}}</div> 
                            </button>
                            </div>
                        </div>
                        <div id="details" v-if="showWorker == 1">
                            <WorkerDetailsView :message="WorkerDetailsView"></WorkerDetailsView>
                                    <component :is="WorkerDetailsView"></component>
                        </div>
                    </div>
                </div>

                <div id="workers" v-else-if="Projects.length != 0">
                    <div id="view">
                        <div id="selectOptionWarker">
                            <button id="selectOptionWarkerButtonFocus" v-if="showAddProject == 0">LIST</button>
                            <button id="selectOptionWarkerButton" v-if="showAddProject == 1" @click.prevent="closeAddProject()">LIST</button>
                            <button id="selectOptionWarkerButton" v-if="showAddProject == 0" @click.prevent="addProject()">ADD</button>
                            <button id="selectOptionWarkerButtonFocus" v-if="showAddProject == 1">ADD</button>
                        </div>
                        <div id="addWorker" v-if="showAddProject == 1">
                            <form id="formWorker">
                            <input class="inputWorker" placeholder="Name" v-model="addTaskName">
                            <input class="inputWorker" placeholder="Coordynator" v-model="addTaskKoor">
                            <input class="inputWorker" placeholder="Descripton" v-model="addTaskDesc">
                            <button id="Add" @click.prevent=" addTaskToBase() ">ADD</button>
                            </form> 
                        </div>
                        <div id="showWorker" v-else>
                            <div id="projects">
                                <button id="Project" v-for="(projekt, index) in Projects" @click.prevent="showselect(projekt)">
                                    <div id="name">{{Projects[index]}}</div> 
                                    <div id="progress">
                                        <div class="statisticProcent2">{{projectPercentage[projekt] +"%"}}</div>
                                        <progress id="file2" :value="projectPercentage[projekt]" max="100"></progress>
                                    </div>
                                </button>
                            </div>
                            <div id="assingments">
                                <div id="view" v-if="showProjectDetails == 1">
                                    <AssingmentView :message="AssingmentView"></AssingmentView>
                                    <component :is="AssingmentView"></component>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

                <div id="workers" v-else>
                    <div class="panel">
                        <div class="statisctic">
                            <div class="panelTop"> <h1>Perform</h1></div>
                            <div class="panelRest">
                                <div class="statisticProcent">32%</div>
                                <progress id="file" value="32" max="100"></progress> 
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="statisctic">
                            <div class="panelTop"> <h1>In Progress</h1></div>
                            <div class="panelRest">
                                <div class="statisticProcent">32%</div>
                                <progress id="file" value="32" max="100"></progress> 
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="statisctic">
                            <div class="panelTop"> <h1>Done</h1></div>
                            <div class="panelRest">
                                <div class="statisticProcent">32%</div>
                                <progress id="file" value="32" max="100"></progress> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/dashboard.css'
import { useToast } from "vue-toastification"
import axios from 'axios'
import { RouterView, RouterLink } from 'vue-router';
import AssingmentView from '@/views/AssingmentView.vue'
import WorkerDetailsView from '@/views/WorkerDetailView.vue'
export default{
    data()
    {
       return{
       Projects: [],
       projectPercentage: {},
       workers: [], 
       showAddWorker: 0, 
       showAddProject:0,
       showProjectDetails: 0,
       addName:'',
       addSurname:'',
       addLogin:'',
       addPassword:'',
       addType:'',
       addTaskName: '',
       addTaskDesc: '',
       addTaskKoor: '',
       TaskSelect: 'test',
       procent : '', 
       showWorker: 0, 
       filtredWorkers: [],
       serch: '', 
       }
    },
    methods:
    {
        async showselect(projekt) 
        {
            this.showProjectDetails = 0; 
                let Project = {
                    Name : projekt,
                }
                let result = await axios.post("http://127.0.0.1:300/sendProjectName", {Project})
                console.log(result); 
                this.showProjectDetails = 1; 
        },
        async Home()
        {
            this.Projects = [];
            this.workers = [];
        },
        async getWorkers()
        {
          this.Projects = [];
          let result = await axios.get("http://127.0.0.1:300/getWorker");
          console.log(result)
          result.data.Login.forEach((elem, index, arr) =>{
             this.workers[index] = elem; 
           }); 
           console.log(this.workers[1])
           this.filtredWorkers = this.workers;
        },
        async getProject()
        {
            this.workers = []; 
            let result = await axios.get("http://127.0.0.1:300/getProject");
            console.log(result)
          result.data.projekt.forEach((elem, index, arr) =>{
             this.Projects[index] = elem; 
             
           }); 
           for(const p in this.Projects) {
            await this.liczProcent(this.Projects[p]);
           }
           console.log(this.Projects[1])
        },
        async addWorker()
        {
           this.showAddWorker = 1; 
        },
        async closeAddWorker()
        {
            this.showAddWorker = 0; 
            getWorkers()
        },
        async addProject()
        {
           this.showAddProject = 1; 
        },
        async closeAddProject()
        {
            this.showAddProject = 0; 
            getProject();
        },
        async AddWorkerToBase()
        {
           let newUser = {
              Name: this.addName,
              Surname: this.addSurname,
              Login: this.addLogin,
              Password: this.addPassword,
              Type: this.addType, 
           }
           let result = await axios.post('http://127.0.0.1:300/addWorkerToBase', {newUser})
           console.log(result);
           if(result.data.AddStatus == "OK")
            {
                this.toastService.success("Tillagd", {
                position: "top-right",
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
                
                this.showAddWorker = 0; 
                getWorkers()
            }
            else
            {
                this.toastService.error("FAILED", {
                position: "top-right",
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
        async addTaskToBase()
        {
            let newProject = {
            Name: this.addTaskName,
            Koord: this.addTaskKoor,
            Desc: this.addTaskDesc
            }
            let request = await axios.post('http://127.0.0.1:300/addProjectToBase', {newProject}); 
            console.log(request)
            if(request.data.AddStatus == "OK")
            {
                this.toastService.success("Tillagd", {
                        position: "top-right",
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

                    this.showAddProject = 0; 
                    getProject();
            }
            else
            {
                this.toastService.error("FAILED", {
                        position: "top-right",
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
        async liczProcent(projectName) {
            let project = 
            {
                Name: projectName,
            }
            let result =  await axios.post('http://127.0.0.1:300/getProcent', {project}); 
            console.log("PROCENTAGE RESULT")

            this.projectPercentage[projectName] = result.data.Percent
        },
        async showWorkerDetail(name)
        {
            console.log("W funkcji: ", name)
            this.showWorker = 0; 
            let User = {
                Name: name,
            }
            let result = await axios.post('http://127.0.0.1:300/sendUser', {User})  
            console.log(result)
            this.showWorker = 1;
        },
    },
    mounted()
    {
        this.toastService = useToast();
    },
    computed: {
        filterWorker(){
            console.log("start this.serch")
            let temp = []; 
            let i=0; 
            let check = 0;
            this.workers.forEach((elem, index, arr) => {
                //console.log("filter elem", elem)
                //console.log("serch: ", this.serch)
                for(let y=0; y<this.serch.length; y++)
                {
                    if(elem[y] == this.serch[y] || this.serch == '')
                    {
                        temp[i] = elem
                        check = 1;
                    }
                    else
                    {
                        break; 
                    }
                }
                if(check == 1)
                {
                    i= i + 1;
                }
                if(this.serch == '')
                    {
                        temp[i] = elem
                        i= i + 1;
                    }
            })
            console.log("temp filter", temp)
            if(temp.length == 0)
                {
                    temp[0] = "BRAK"
                    return temp;
                }
                else
                {
                    return temp;
                }
             
        }
    },
    components: 
    {
        AssingmentView,
        WorkerDetailsView,
    },
}

</script>