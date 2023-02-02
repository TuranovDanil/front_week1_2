let eventBus = new Vue();

Vue.component('container', {
    template: `
    <div class="container">
        <left-list></left-list>
        <center-list></center-list>
        <right-list></right-list>
    </div>
    `,
    data() {
        return {};
    },
    methods: {

    },
    computed: {

    }

})

Vue.component('left-list', {
    template: `
    <div class="left-list">
        <div class="column column1">
            <h2>1</h2>
            <div>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            </div>
        </div>
    </div>
    `,
    data() {
        return {};
    },
    methods: {

    },
    computed: {

    }
})

Vue.component('center-list', {
    template: `
    <div class="center-list">
        <div class="column column2">
            <h2>2</h2>
            <div>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            </div>        
        </div>
    </div>
    `,
    data() {
        return {};
    },
    methods: {

    },
    computed: {

    }
})

Vue.component('right-list', {
    template: `
    <div class="right-list">
        <div class="column column3">
            <h2>3</h2>
            <div>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h3>Название</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            </div>
        </div>
    </div>
    `,
    data() {
        return {};
    },
    methods: {

    },
    computed: {

    }
})

let app = new Vue({
    el: '#app',
    data: {

    },
    methods: {

    }
})