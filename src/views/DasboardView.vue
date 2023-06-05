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

                <div id="workers2" v-else>
                    <h1>Total</h1>
                    <div id="chartrow">
                        <div id="chart">
                            <div id="chartTitle">Projects</div>
                            <div class="panel">
                            <apexchart
                            width="600"
                            type="area"
                            :options="chartOptionsMonth"
                            :series="seriesProjects"
                            ></apexchart>
                            </div>
                        </div>
                        <div id="chart">
                            <div id="chartTitle">Assingments</div>
                            <div class="panel">
                            <apexchart
                            width="600"
                            type="area"
                            :options="chartOptionsMonth"
                            :series="series"
                            ></apexchart>
                            </div>
                        </div>
                        <div id="chart">
                            <div id="chartTitle">Hours</div>
                            <div class="panel">
                            <apexchart
                            width="600"
                            type="area"
                            :options="chartOptionsMonth"
                            :series="seriesHours"
                            ></apexchart>
                            </div>
                        </div>
                   </div>
                   <h1>Per User for {{this.tempMonthForDisplay}}</h1>
                   <div id="buttonsSelectMonth">
                    <button id="monthButton" @click.prevent="setMonthForDiagrams('Previous')">Previous</button>
                    <button id="monthButton" @click.prevent="setMonthForDiagrams('Current')">Current</button>
                    <button id="monthButton" @click.prevent="setMonthForDiagrams('Next')">Next</button>
                   </div>
                   <div id="chartrow">
                        <div id="chart">
                            <div id="chartTitle">Projects</div>
                            <div class="panel">
                            <apexchart
                            width="600"
                            type="area"
                            :options="chartOptionsUsers"
                            :series="seriesUsersProjects"
                            ></apexchart>
                            </div>
                        </div>
                        <div id="chart">
                            <div id="chartTitle">Assingments</div>
                            <div class="panel">
                            <apexchart
                            width="600"
                            type="area"
                            :options="chartOptionsUsers"
                            :series="seriesUsersAsig"
                            ></apexchart>
                            </div>
                        </div>
                        <div id="chart">
                            <div id="chartTitle">Hours</div>
                            <div class="panel">
                            <apexchart
                            width="600"
                            type="area"
                            :options="chartOptionsUsers"
                            :series="seriesUsersHours"
                            ></apexchart>
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
import { withScopeId } from 'vue';
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
       selectedmonth:'',
       tempPreviousMonth: 0,
       tempMonthForDisplay:'',

       chartOptionsMonth: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      },
      chartOptionsUsers: {
        chart: {
          id: "vuechart-users",
        },
        xaxis: {
            type: 'category',
          categories: [""],
        },
      },
      series: [
            {
            name: "series-1",
            data: [],
            }, 
        ],
        seriesHours: [
            {
            name: "series-1",
            data: [],
            },     
        ],
        seriesProjects: [
            {
            name: "series-1",
            data: [],
            },     
        ],
        seriesUsersProjects: [
            {
            name: "series-1",
            data: [],
            },     
        ],
        seriesUsersAsig: [
            {
            name: "series-1",
            data: [],
            },     
        ],
        seriesUsersHours: [
            {
            name: "series-1",
            data: [],
            },     
        ],
       }
    },
    methods:
    {
        async setMonthForDiagrams(month)
        {
              this.selectedmonth = month;
              if(month == 'Current')
              {
                let tempDate = new Date();
                let tempMonth = tempDate.getMonth() + 1;
                this.tempPreviousMonth = tempMonth;
              }
              else if (month == 'Previous')
              {
                if(this.tempPreviousMonth == 1)
                {
                    this.tempPreviousMonth
                }
                else
                {
                    this.tempPreviousMonth = this.tempPreviousMonth -1;
                }
              }
              else
              {
                if(this.tempPreviousMonth == 12)
                {
                    this.tempPreviousMonth
                }
                else
                {
                this.tempPreviousMonth = this.tempPreviousMonth + 1;
                }
              }
              this.getUsersDataForDiagrams(this.selectedmonth);
              this.setMonthName(this.tempPreviousMonth - 1);
        },
        async setMonthName(month)
        {
            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
                ];

 
            let MonthName = months[month];
            this.tempMonthForDisplay = MonthName;
        },
        async getUsersDataForDiagrams(witchMonth)
        {
            if(witchMonth == 'Current')
            {
                console.log("Pobieram dla obecnego miesiaca")
            let tempUsersNames = []; 
            let users = await axios.get("http://127.0.0.1:300/getUsersList")
            users.data.Users.forEach((elem, index, arr) => {
                tempUsersNames[index] = elem[1];
            })
            console.log("names: ", tempUsersNames)
            this.chartOptionsUsers.xaxis.categories.pop()
            tempUsersNames.forEach((elem, index, arr) => {
                this.chartOptionsUsers.xaxis.categories.push(elem)
                console.log("dodaje: ", elem)
            })
            console.log("hartOptionsUsers: ",this.chartOptionsUsers.xaxis.categories)
            console.log("chartOptionsMonth: ",this.chartOptionsMonth.xaxis.categories)

            let tempUserProjectAmmount = []
            let tempUserAssigAmmount = []
            let tempUserHoursAmmount = []
            let tempProjects = await axios.get("http://127.0.0.1:300/getProjectsData");
            console.log(tempProjects)
            let resultAssig = await axios.get("http://127.0.0.1:300/getAssingmentData");
 
                users.data.Users.forEach((elem, index, arr) => {
                    let tempCounterAssig = 0;
                    let tempCounterHours = 0;
                    resultAssig.data.Assingments.forEach((elemT, indexT, arrT) => {
                        let tempDate = new Date(elemT[3]);
                        let tempMonth = tempDate.getMonth() + 1;
                        let tempCurDate = new Date();
                        let tempCurMonth = tempCurDate.getMonth() + 1; 
                        if(tempCurMonth == tempMonth)
                        {
                            if(elemT[2] == elem[0])
                            {
                                tempCounterAssig += 1;
                                tempCounterHours += parseInt(elemT[4]);
                            }
                        }
                    })
                    tempUserAssigAmmount[index] = tempCounterAssig;
                    tempUserHoursAmmount[index] = tempCounterHours;
                })

                users.data.Users.forEach((elem, index, arr) => {
                    let tempCounterProject =0; 
                    tempProjects.data.Projects.forEach((elemT, indexT, arrT) => {
                        let check =0; 
                       resultAssig.data.Assingments.forEach((elemF, indexF, arrF) => {
                            let tempDate = new Date(elemF[3]);
                            let tempMonth = tempDate.getMonth() + 1;
                            let tempCurDate = new Date();
                            let tempCurMonth = tempCurDate.getMonth() + 1; 
                            if(tempCurMonth == tempMonth)
                            {
                                if(elemF[1] == elem[0])
                                {
                                    if(elemF[1] == elemT[0])
                                    {
                                        check = 1;
                                    }
                                }
                            }
                       })
                       tempCounterProject += 1;
                    })
                    tempUserProjectAmmount[index] = tempCounterProject;
                })
                this.seriesUsersProjects[0].data = tempUserProjectAmmount;
                this.seriesUsersAsig[0].data = tempUserAssigAmmount;
                this.seriesUsersHours[0].data = tempUserHoursAmmount;
            }
            else
            {
                let tempUsersNames = []; 
            let users = await axios.get("http://127.0.0.1:300/getUsersList")
            users.data.Users.forEach((elem, index, arr) => {
                tempUsersNames[index] = elem[1];
            })
            console.log("names: ", tempUsersNames)
            this.chartOptionsUsers.xaxis.categories.pop()
            tempUsersNames.forEach((elem, index, arr) => {
                this.chartOptionsUsers.xaxis.categories.push(elem)
                console.log("dodaje: ", elem)
            })
            console.log("hartOptionsUsers: ",this.chartOptionsUsers.xaxis.categories)
            console.log("chartOptionsMonth: ",this.chartOptionsMonth.xaxis.categories)

            let tempUserProjectAmmount = []
            let tempUserAssigAmmount = []
            let tempUserHoursAmmount = []
            let tempProjects = await axios.get("http://127.0.0.1:300/getProjectsData");
            console.log(tempProjects)
            let resultAssig = await axios.get("http://127.0.0.1:300/getAssingmentData");
 
                users.data.Users.forEach((elem, index, arr) => {
                    let tempCounterAssig = 0;
                    let tempCounterHours = 0;
                    resultAssig.data.Assingments.forEach((elemT, indexT, arrT) => {
                        let tempDate = new Date(elemT[3]);
                        let tempMonth = tempDate.getMonth() + 1;
                        let tempCurDate = new Date();
                        let tempCurMonth = this.tempPreviousMonth; 
                        console.log("MIESIAC KUWRA:",tempCurMonth)
                        if(tempCurMonth == tempMonth)
                        {
                            if(elemT[2] == elem[0])
                            {
                                tempCounterAssig += 1;
                                tempCounterHours += parseInt(elemT[4]);
                            }
                        }
                    })
                    tempUserAssigAmmount[index] = tempCounterAssig;
                    tempUserHoursAmmount[index] = tempCounterHours;
                })

                users.data.Users.forEach((elem, index, arr) => {
                    let tempCounterProject =0; 
                    tempProjects.data.Projects.forEach((elemT, indexT, arrT) => {
                        let check =0; 
                       resultAssig.data.Assingments.forEach((elemF, indexF, arrF) => {
                            let tempDate = new Date(elemF[3]);
                            let tempMonth = tempDate.getMonth() + 1;
                            let tempCurDate = new Date();
                            let tempCurMonth = tempCurDate.getMonth() + 1; 
                            if(tempCurMonth == tempMonth)
                            {
                                if(elemF[1] == elem[0])
                                {
                                    if(elemF[1] == elemT[0])
                                    {
                                        check = 1;
                                    }
                                }
                            }
                       })
                       tempCounterProject += 1;
                    })
                    tempUserProjectAmmount[index] = tempCounterProject;
                })
                this.seriesUsersProjects[0].data = tempUserProjectAmmount;
                this.seriesUsersAsig[0].data = tempUserAssigAmmount;
                this.seriesUsersHours[0].data = tempUserHoursAmmount
            }
        },
        async getDataForMonthsDiagrams()
        {
                console.log("MID | POBIERAM DANE DO WYKRESOW");
              let tempProjects = await axios.get("http://127.0.0.1:300/getProjectsData")
              let tempProject = tempProjects.data.Projects;

              let tempCoutedHours = [];
              let tempCountedAmmountOfProjects = []; 
              let tempCountedAmmountOfAssingments = [];
              let CheckProject = 0; 
              let resultAssig = await axios.get("http://127.0.0.1:300/getAssingmentData")
              let tempAssig = resultAssig.data.Assingments;
              //console.log("Assingments: ", tempAssig) 
             for(let i=0; i<12; i++)
             {
                let tempAssigCounter = 0;  
                let tempHourCounter = 0;
                tempAssig.forEach((elem, index, arr) => {
                      let tempDate = new Date(elem[3]);
                      let tempMonth = tempDate.getMonth() + 1;
                      let tempIndex = i + 1;
                      if(tempIndex == tempMonth)
                      {
                         tempAssigCounter += 1; 
                         tempHourCounter += parseFloat(elem[4])
                      }
              
                })
                tempCoutedHours[i] = tempHourCounter;
                tempCountedAmmountOfAssingments[i] = tempAssigCounter;
             }
             this.seriesHours[0].data = tempCoutedHours;
             this.series[0].data = tempCountedAmmountOfAssingments;
             console.log("serie: ", this.series)
             
             let tempProjCounter = 0;
             for(let i=0; i<12; i++)
             {
                tempProjCounter = 0;
                tempProject.forEach((elem, index, arr) => {
                    let check = 0;
                    tempAssig.forEach((elemT, indexT, arrT) => {
                      let tempDate = new Date(elemT[3]);
                      let tempMonth = tempDate.getMonth() + 1;
                      let tempIndex = i + 1;
                      if(tempIndex == tempMonth)
                      {
                         if(elem[0] == elemT[1])
                         {
                            check =1;
                         }
                      }
                    })
                    if(check == 1)
                    {
                      tempProjCounter += 1;
                    }
                })
                tempCountedAmmountOfProjects[i] = tempProjCounter;
             }
             console.log("projects: ", tempCountedAmmountOfProjects)
             this.seriesProjects[0].data = tempCountedAmmountOfProjects;
             //console.log("Counted Hours: ", tempCoutedHours)
             //console.log("Counted Assing: ", tempCountedAmmountOfAssingments)
        },
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
        async countMointh() 
        {
         for(let i=1 ; i<=14; i++)
         {
            this.chartOptionsMonth.xaxis.categories.push(i);
         }
        },
        async setUP()
        {
            await this.getDataForMonthsDiagrams();
            await this.countMointh();
            await this.getUsersDataForDiagrams();
            setMonthForDiagrams('Current')
        }
    },
    async mounted()
    {
        await this.setUP();
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