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
                this.updateCompletedNum();
                this.save();
            }
        },
        checkbox(id) {
            this.note_data.tasks[id].completed = !this.note_data.tasks[id].completed;
            this.updateCompletedNum();
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
    <div class="list" >
            <div class="note_title_block">
                <h2 class="note_title">{{note_data.noteTitle}}</h2>
                <button @click="delNote()">X</button>
            </div>
            <div class="tasks">
                <div v-for="(element, elementId) in note_data.tasks" :key="elementId" class="task">
                    <div class="set_task">
                        <h3 class="title_task">{{element.taskTitle}}</h3>
                        <input @click="checkbox(elementId),column1Move(),column2Move(),column2MoveLeft()" 
                               type="checkbox" 
                               v-model="element.completed" 
                               :class="{none: note_data.completedNum === 100, disabled: note_data.completedNum > 50 && element.completed}" >
                    </div>
                    <div class="date" v-if="note_data.date">
                        <p>{{note_data.time}}</p>
                        <p>{{note_data.date}}</p>
                    </div>
                </div>
                <div class="add_task" :class="{none: note_data.tasks.length >= 5}">                  
                    <div class="add_task_input">
                        <input required type="text" @keyup.enter="addTask(),column2MoveLeft()" v-model="taskTitle" placeholder="Задача">
                    </div>
                    <button @click="addTask(),column2MoveLeft()">Добавить</button>
            </div>
        </div>
    </div>

    `,
})


let app = new Vue({
    el: '#app',
    data: {
        notes: [],
        notes2: [],
        notes3: [],
        noteTitle: null,
        taskTitle1: null,
        taskTitle2: null,
        taskTitle3: null,
        completed: false,
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
            if (this.noteTitle && this.notes.length < 3 && this.taskTitle1 && this.taskTitle2 && this.taskTitle3) {
                this.notes.push({
                    noteTitle: this.noteTitle,
                    tasks: [
                        {
                            taskTitle: this.taskTitle1,
                            completed: this.completed
                        },
                        {
                            taskTitle: this.taskTitle2,
                            completed: this.completed
                        },
                        {
                            taskTitle: this.taskTitle3,
                            completed: this.completed
                        }
                    ],
                    completedNum: 0,
                    date: null,
                    time: null
                });
                this.noteTitle = null;
                this.taskTitle1 = null;
                this.taskTitle2 = null;
                this.taskTitle3 = null
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
            if (this.notes[id].completedNum > 50 && this.notes2.length < 5) {
                this.notes2.push(this.notes[id])
                this.notes.splice(id, 1)
            }
            localStorage.todo = JSON.stringify(this.notes);
            localStorage.todo2 = JSON.stringify(this.notes2);
        },
        moveColumn2(id) {
            if (this.notes2[id].completedNum === 100) {
                this.timeAndData(id);
                this.notes3.push(this.notes2[id]);
                this.notes2.splice(id, 1);
            }
            localStorage.todo2 = JSON.stringify(this.notes2);
            localStorage.todo3 = JSON.stringify(this.notes3);
        },
        moveColumn2Left(id) {
            if (this.notes2[id].completedNum <= 50) {
                this.notes.unshift(this.notes2[id]);
                this.notes2.splice(id, 1);
            }
            localStorage.todo = JSON.stringify(this.notes);
            localStorage.todo2 = JSON.stringify(this.notes2);
        },
        timeAndData(id){
            let Data = new Date();
            this.notes2[id].time = Data.getHours() + ':' + Data.getMinutes();
            this.notes2[id].date = Data.getDate() + ':' + Data.getMonth() + ':' + Data.getFullYear();
        }
    },
})