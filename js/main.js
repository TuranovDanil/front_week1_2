let eventBus = new Vue();

Vue.component('list', {
    props: {
        note_data: {
            type: Object,
            default() {
                return {}
            }
        },
        notes: {
            type: Array,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            taskTitle: null,
            task: [],
        }

    },
    methods: {
        delNote() {
            this.$emit('del_note')
        },
        column1Move(){
            this.$emit('column1_move')
        },
        column2Move(){
            this.$emit('column2_move')
        },
        addTask() {
            if (this.taskTitle) {
                this.note_data.tasks.push({
                    taskTitle: this.taskTitle,
                    completed: false,
                });
                this.taskTitle = null;
                localStorage.todo = JSON.stringify(this.notes);
            }
        },
        checkbox(id) {
            this.note_data.tasks[id].completed = !this.note_data.tasks[id].completed;
            let counterCompleted = 0;
            let counterNotCompleted = 0;
            for (let el of this.note_data.tasks) {
                if (el.completed) {
                    counterCompleted++;
                } else {
                    counterNotCompleted++;
                }
            }
            this.note_data.completedNum = (counterCompleted / (counterCompleted + counterNotCompleted)) * 100;
            this.column1Move();
            this.column2Move();
            localStorage.todo = JSON.stringify(this.notes);
        }

    },
    template: `
    <div class="list">
            <div class="create_task">
                <h3 class="title_block">{{note_data.noteTitle}}</h3>
                <button @click="delNote()">X</button>
            </div>
            <div class="task">
                <div v-for="(element, elementId) in note_data.tasks" :key="elementId">
                    <div class="set_task">
                        <p class="title_task">{{element.taskTitle}}</p>
                        <input @click="checkbox(elementId),column1Move() "  type="checkbox" v-model="element.completed" :class="{none: note_data.completedNum === 100}">
                    </div>
                </div>
                <div class="add_task" :class="{none: note_data.tasks.length >= 5}">                  
                    <div class="add_task_input">
                        <input required type="text" @keyup.enter="addTask" v-model="taskTitle" placeholder="Задача">
                    </div>
                    <button @click="addTask">Добавить</button>
            </div>
        </div>
    </div>

    `,
})

// Vue.component('center-list', {
//     props: {
//         note_data: {
//             type: Object,
//             default() {
//                 return {}
//             }
//         },
//         notes: {
//             type: Array,
//             default() {
//                 return {}
//             }
//         }
//     },
//     data() {
//         return {
//             taskTitle: null,
//             task: [],
//         }
//
//     },
//     methods: {
//         delNote() {
//             this.$emit('del_note')
//         },
//         addTask() {
//             if (this.taskTitle) {
//                 this.note_data.tasks.push({
//                     taskTitle: this.taskTitle,
//                     completed: false,
//                 });
//                 this.taskTitle = null;
//                 localStorage.todo = JSON.stringify(this.notes)
//             }
//         },
//         checkbox(id){
//             this.note_data.tasks[id].completed = !this.note_data.tasks[id].completed;
//             let counterCompleted = 0;
//             let counterNotCompleted = 0;
//             for (let el of this.note_data.tasks) {
//                 if (el.completed) {
//                     counterCompleted++;
//                 } else {
//                     counterNotCompleted++;
//                 }
//             }
//             this.note_data.completedNum = (counterCompleted / (counterCompleted + counterNotCompleted)) * 100;
//             localStorage.todo = JSON.stringify(this.notes);
//         },
//     },
//     template: `
//     <div class="center-list">
//         <div class="column column2" v-if="note_data.completedNum > 50">
//             <div class="create_task">
//                 <h3 class="title_block">{{note_data.noteTitle}}</h3>
//                 <button @click="delNote()">X</button>
//             </div>
//             <div class="task">
//                 <div v-for="(element, elementId) in note_data.tasks" :key="elementId">
//                     <div class="set_task">
//                         <p class="title_task">{{element.taskTitle}}</p>
//                         <input @click="checkbox(elementId)" type="checkbox" v-model="element.completed">
//                     </div>
//                 </div>
//                 <div class="add_task">
//                     <div class="add_task_input">
//                         <input type="text" @keyup.enter="addTask" v-model="taskTitle" placeholder="Задача">
//                     </div>
//                     <button @click="addTask">Добавить</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `,
// })
//
// Vue.component('right-list', {
//     template: `
//     <div class="right-list">
//         <div class="column column3">
//             <div class="create_task">
//                 <h3 class="title_block">{{note_data.noteTitle}}</h3>
//                 <button @click="delNote()">X</button>
//             </div>
//             <div class="task">
//                 <div v-for="(element, elementId) in note_data.tasks" :key="elementId">
//                     <div class="set_task">
//                         <p class="title_task">{{element.taskTitle}}</p>
//                         <input @click="checkbox(elementId)" type="checkbox" v-model="element.completed">
//                     </div>
//                 </div>
//                 <div class="add_task">
//                     <div class="add_task_input">
//                         <input type="text" @keyup.enter="addTask" v-model="taskTitle" placeholder="Задача">
//                     </div>
//                     <button @click="addTask">Добавить</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `,
//     data() {
//         return {};
//     },
//     methods: {},
//     computed: {}
// })


let app = new Vue({
    el: '#app',
    data: {
        notes: [],
        notes2: [],
        notes3: [],
        noteTitle: null,
        todos: [],
    },
    computed: {},
    mounted() {
        if (localStorage.todo) {
            this.notes = JSON.parse(localStorage.todo);

        }
    },
    methods: {
        addInTodos() {
            this.todos.push({
                notes: this.notes,
                notes2: this.notes2,
                notes3: this.notes3
            })

        },
        createNote() {
            if (this.noteTitle) {
                this.notes.push({
                    noteTitle: this.noteTitle,
                    tasks: [],
                    completedNum: 0,
                });
                this.noteTitle = null;
                localStorage.todo = JSON.stringify(this.notes);
            }
        },
        deleteNote(id) {
            this.notes.splice(id, 1);
            localStorage.todo = JSON.stringify(this.notes);
        },
        moveColumn1(){
            for (let i = 0; i < this.notes.length; i++){
                if(this.notes[i].completedNum > 50){
                    this.notes2.push(this.notes[i])
                    this.notes.splice(this.notes[i], 1)
                    console.log(123)
                }
            }
            localStorage.todo = JSON.stringify(this.notes);

        },
        moveColumn2(){
            for (let i = 0; i < this.notes2.length; i++){
                if(this.notes2[i].completedNum === 100){
                    this.notes3.push(this.notes2[i])
                    this.notes2.splice(this.notes2[i], 1)
                }
            }
        },
    },
})