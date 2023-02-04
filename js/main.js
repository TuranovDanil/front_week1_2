let eventBus = new Vue();

Vue.component('left-list', {
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
        delNote(){
            this.$emit('del_note')
        },
        addTask() {
            if (this.taskTitle){
                this.note_data.tasks.push({
                    taskTitle: this.taskTitle,
                    completed: false,
                });
                this.taskTitle = null;
                localStorage.todo = JSON.stringify(this.notes)
            }
        },
        checkbox(id){
            this.note_data.tasks[id].completed = !this.note_data.tasks[id].completed;
            localStorage.todo = JSON.stringify(this.notes);
        }

    },
    computed: {},
    template: `
    <div class="center-list">
        <div class="column column2" >
            <div class="create_task">
                <h3 class="title_block">{{note_data.noteTitle}}</h3>
                <button @click="delNote()">X</button>
            </div>
            <div class="task">
                <div v-for="(element, elementId) in note_data.tasks" :key="elementId">
                    <div class="set_task">
                        <p class="title_task">{{element.taskTitle}}</p>
                        <p >{{element.completed}}</p>
                        <input @click="checkbox(elementId)" type="checkbox" v-model="element.completed">
                    </div>
                </div>
                <div class="add_task">
                    <div class="add_task_input">
                        <input type="text" @keyup.enter="addTask" v-model="taskTitle" placeholder="Задача">
                    </div>
                    <button @click="addTask">Добавить</button>
                </div>
            </div>
        </div>
    </div>

    `,
    data() {
        return {};
    },

})

Vue.component('center-list', {
    template: `
    <div class="center-list">
        <div class="column column2">

        </div>
    </div>
    `,
    data() {
        return {};
    },
    methods: {},
    computed: {}
})

Vue.component('right-list', {
    template: `
    <div class="right-list">
        <div class="column column3">

        </div>
    </div>
    `,
    data() {
        return {};
    },
    methods: {},
    computed: {}
})


let app = new Vue({
    el: '#app',
    data: {
        notes: [],
        noteTitle: null,
        todos: []
    },
    mounted() {
        if (localStorage.todo) {
            this.notes = JSON.parse(localStorage.todo)
        }
    },
    methods: {
        addInTodos() {
            this.todos.push({
                notes: this.notes
            })

        },
        createNote() {
            if(this.noteTitle){
                this.notes.push({
                    noteTitle: this.noteTitle,
                    tasks: [],
                });
                this.noteTitle = null;
                localStorage.todo = JSON.stringify(this.notes);
            }
        },
        deleteNote(id){
            this.notes.splice(id, 1);
            localStorage.todo = JSON.stringify(this.notes);
        }
    },
})