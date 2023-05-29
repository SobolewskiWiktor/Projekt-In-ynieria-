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
    <div id="wokrerDetailMonth">
      <div id="Title">
         <h1>Month</h1>
      </div>
      <div id="workerDetailsMonthConent">
         <div id="mohtBurrons" v-for="(Month, index) in months">
            <button id="MonthButton" v-if="months[index] != currentMonth" @click.prevent="setupByMonth(months[index])">{{months[index]}} </button>
            <button id="MonthButtonCurrent" v-else @click.prevent="setupByMonth(months[index])">{{months[index]}} </button>
         </div>
      </div>
    </div>
    <div id="workerDetailProjects">
      <div id="statistic">
         <div id="title">Details</div>
          <div id="statisticRest">
             <div id="statisticHour">
                <div id="statisticHourTitle">Hours</div>
                <div id="staticHourImage">
                  <img id="staticHourImg" src="@/assets/clock.png"/>
                </div>
                <div id="staticHourAmmount">
                   {{this.userHours}} h
                </div>
             </div>
             <div id="statisticHour">
                <div id="statisticHourTitle">Projects</div>
                <div id="staticHourImage">
                  <img id="staticHourImg" src="@/assets/layers.png"/>
                </div>
                <div id="staticHourAmmount">
                   {{this.userProjectsAmmount}} / {{this.allProjects}}
                </div>
             </div>
             <div id="statisticHour">
                <div id="statisticHourTitle">Assingments</div>
                <div id="staticHourImage">
                  <img id="staticHourImg" src="@/assets/briefing.png"/>
                </div>
                <div id="staticHourAmmount">
                   {{this.userAssingmentsAmmount}} / {{this.allAssingments}}
                </div>
             </div>
          </div>
      </div>
         <div id="Proejct" v-for="(project, index) in userProjects">
            {{userProjects[index][0]}} - {{projectHours[parseInt(userProjects[index][1])]}} h
             <div id="AssigName" v-for="(assig, index2) in userAssingments">
               <div id="contentAssig2" v-if="userAssingments[index2][1] == userProjects[index][1]" >
                  <div id="contentAssigImg"></div>
                  <div id="contentAssigText">
                     <div id="contentAssigTextTitle">{{userAssingments[index2][0]}}</div>
                     <div id="contentAssigHours">{{userAssingments[index2][2]}} h</div>
                     <div id="contentAssigDate">{{userAssingments[index2][3]}}</div>
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
import axios, { all } from 'axios'

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
           userHours:'',
           userProjectsAmmount: '',
           allProjects: '', 
           userAssingmentsAmmount: '', 
           allAssingments: '', 
           projectHours: [], 
           months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'],
           currentMonth: 'May', 
        }
    },
    mounted() 
    {
        this.setup();
    },
    computed:
    {
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
         let projectsAmmount = 0; 
                 let Data = {
                  userID: this.userID,
                  Month: this.currentMonth,
                 }
            let result = await axios.post(`http://127.0.0.1:300/getAllProject`, {Data})
            result.data.Projects.forEach((elem, index, arr) => {
               projectWithAssingment[index] = elem; 
               projectsAmmount = projectsAmmount + 1;
            })
            this.allProjects = projectsAmmount;
            let userProjects = 0; 
            let result2 = await axios.post(`http://127.0.0.1:300/getAllAssingment`,{Data})
            result2.data.assig.forEach((elem, index, arr) => {
               assingment[index] = elem;

            })
            let temp = [];
            assingment.forEach((elem, index, arr) => {
               let found = temp.find(item => item == elem[1])
               if(!found)
               {
                  temp.push(elem[1])
                  userProjects = userProjects + 1;
               }
            })
            this.userProjects = projectWithAssingment;
            this.userAssingments = assingment;
            this.userProjectsAmmount = userProjects;
            console.log("Assig:", this.userAssingments)
         },
         async getHours()
         {
            let hours = 0; 
            this.userAssingments.forEach((elem, index, arr) => 
            {
               hours = hours + parseInt(elem[2])
            })
            this.userHours = hours

         },
         async getHoleAssingments()
         {
            let allAssingments =0;
            let userAssingments = 0;  
            let result = await axios.get('http://127.0.0.1:300/getHoleAssingment')
            result.data.All.forEach((elem, index, arr) => {
                  allAssingments = allAssingments + 1;
                  if(elem[1] == this.userID)
                  {
                     userAssingments = userAssingments + 1;
                  } 
            })
            this.userAssingmentsAmmount = userAssingments;
            this.allAssingments = allAssingments; 
         },
         async coutProjectHours()
         {
           var hours = 0; 
           this.userProjects.forEach((elem, idex, arr) => {
               this.userAssingments.forEach((elem2, index2, arr2) => {
                  if(elem[1] == elem2[1])
                  { 
                     hours = hours + parseInt(elem2[2])
                  }
               })
               this.projectHours[elem[1]] = hours;
               hours = 0; 
           })
         },
         async setCurrentMonth()
         {
           let currentMonth = new Date();
           let currentMonthFixed = currentMonth.getMonth()
           this.currentMonth = this.months[currentMonthFixed]
         },
         async setupByMonth(month)
         {
             this.currentMonth = month; 
             await this.setup2();
         },
       async setup()
       {
         await this.setCurrentMonth();
           await this.getWorker();
           await this.getWorkerName(); 
           await this.getWorkerID();
           await this.getAllProject();
           await this.getHours(); 
           await this.getHoleAssingments(); 
           await this.coutProjectHours(); 
       },
       async setup2()
       {
           await this.getWorker();
           await this.getWorkerName(); 
           await this.getWorkerID();
           await this.getAllProject();
           await this.getHours(); 
           await this.getHoleAssingments(); 
           await this.coutProjectHours(); 
       }
    },
}
</script>