<template>
    <div id="content">
        <div id="contentLeft">
            <div id="contentleftTop">
                <h1>TaskMate</h1>
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
                         <input class="inputWorker" placeholder="Imie">
                         <input class="inputWorker" placeholder="Nazwisko">
                         <input class="inputWorker" placeholder="Login">
                         <input class="inputWorker" placeholder="Haslo">
                         <button id="Add">Add</button>
                       </form>
                    </div>
                    <div id="showWorker" v-else>
                        <button id="worker" v-for="(worker, index) in workers">
                            <img id="workerImg" src="../components/icons/man.png">
                            <div id="name">{{workers[index]}}</div> 
                        </button>
                    </div>
                </div>

                <div id="workers" v-else-if="Projects.length != 0">
                    <button id="Project" v-for="(projekt, index) in Projects">
                     <div id="name">{{Projects[index]}}</div> 
                    </button>
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
import axios from 'axios'
export default{
    data()
    {
       return{
       Projects: [],
       workers: [], 
       showAddWorker: 0, 
       showAddProject:0,
       }
    },
    methods:
    {
        async Home()
        {
            this.Projects = [];
            this.workers = [];
        },
        async getWorkers()
        {
          this.Projects = [];
          let result = await axios.get("http://localhost:300/getWorker");
          console.log(result)
          result.data.Login.forEach((elem, index, arr) =>{
             this.workers[index] = elem; 
           }); 
           console.log(this.workers[1])
        },
        async getProject()
        {
            this.workers = []; 
            let result = await axios.get("http://localhost:300/getProject");
            console.log(result)
          result.data.projekt.forEach((elem, index, arr) =>{
             this.Projects[index] = elem; 
           }); 
           console.log(this.Projects[1])
        },
        async addWorker()
        {
           this.showAddWorker = 1; 
        },
        async closeAddWorker()
        {
            this.showAddWorker = 0; 
        }
    }
}

</script>