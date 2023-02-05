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
        column1Move() {
            this.$emit('column1_move')
        },
        column2Move() {
            this.$emit('column2_move')
        },
        column2MoveLeft() {
            this.$emit('column2_move_left')
        },
        addTask() {
            if (this.taskTitle) {
                this.note_data.tasks.push({
                    taskTitle: this.taskTitle,
                    completed: false,
                });
                this.taskTitle = null;
                this.save();
                this.updateCompletedNum();
                // this.column1Move();
                // this.column2Move();
                // this.save();
            }
        },
        checkbox(id) {
            this.note_data.tasks[id].completed = !this.note_data.tasks[id].completed;
            this.updateCompletedNum();
            this.column1Move();
            this.column2Move();
            this.column2MoveLeft()
            this.save();
        },
        updateCompletedNum() {
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

        },
        save() {
            if (this.note_data.completedNum <= 50) localStorage.todo = JSON.stringify(this.notes);
            else if (this.note_data.completedNum === 100) localStorage.todo3 = JSON.stringify(this.notes);
            else localStorage.todo2 = JSON.stringify(this.notes);
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
                        <input @click="checkbox(elementId),column1Move(),column2Move(),column2MoveLeft()"  type="checkbox" v-model="element.completed" :class="{none: note_data.completedNum === 100}">
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
    },
    computed: {},
    mounted() {
        if (localStorage.todo) {
            this.notes = JSON.parse(localStorage.todo)
        }
        if (localStorage.todo2) {
            this.notes2 = JSON.parse(localStorage.todo2)
        }
        if (localStorage.todo3) {
            this.notes3 = JSON.parse(localStorage.todo3)
        }
    },
    methods: {
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
        deleteNote1(id) {
            this.notes.splice(id, 1);
            localStorage.todo = JSON.stringify(this.notes);
        },
        deleteNote2(id) {

            this.notes2.splice(id, 1);
            localStorage.todo2 = JSON.stringify(this.notes2);
        },
        deleteNote3(id) {
            this.notes3.splice(id, 1);
            localStorage.todo3 = JSON.stringify(this.notes3);
        },
        moveColumn1(id) {
            if (this.notes[id].completedNum > 50) {
                this.notes2.push(this.notes[id])
                this.notes.splice(id, 1)
            }
            localStorage.todo = JSON.stringify(this.notes);
            localStorage.todo2 = JSON.stringify(this.notes2);
        },
        moveColumn2(id) {
            if (this.notes2[id].completedNum === 100) {
                this.notes3.push(this.notes2[id])
                this.notes2.splice(id, 1)
            }
            // else if (this.notes2[id].completedNum <= 50) {
            //     this.notes.unshift(this.notes2[id])
            //     this.notes2.splice(this.notes2[id], 1)
            // }
            // localStorage.todo = JSON.stringify(this.notes);
            localStorage.todo2 = JSON.stringify(this.notes2);
            localStorage.todo3 = JSON.stringify(this.notes3);
        },
        moveColumn2Left(id) {
            if (this.notes2[id].completedNum <= 50) {
                this.notes.unshift(this.notes2[id])
                this.notes2.splice(id, 1)
            }
            localStorage.todo = JSON.stringify(this.notes);
            localStorage.todo2 = JSON.stringify(this.notes2);
        },
    },
})