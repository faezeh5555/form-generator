<template>
    <main class="form-list middle">
        <section class="form">
            <div class="title">Form List</div>
            <div class="table-container">
                <table class="form-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>view</th>
                            <th>delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(formItems, formName) in savedForms" :key="formName">
                            <td>{{ formName }}</td>
                            <td><router-link :to="`/form/view/${formName}`"><i class="fa-solid fa-eye"></i></router-link></td>
                            <td @click="onClick_deleteForm(formName)"><a ><i class="fa-solid fa-trash"></i></a></td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </section>
    </main>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        onClick_deleteForm(formName){
            this.$store.commit('deleteForm', formName);
        }
    },
    computed:{
        savedForms() {
            return this.$store.state.forms;
        }
    },

};
</script>