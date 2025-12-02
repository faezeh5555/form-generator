<template>
    <main class="form-list middle">
        <section class="form">
            <div class="title">Form List</div>
            <div class="table-container">
                <table class="form-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(formItems, formName) in savedForms" :key="formName">
                            <td>{{ formName }}</td>
                            <td><router-link to="/"><i class="fa-solid fa-pen-to-square"></i></router-link></td>
                            <td><a  to=""><i class="fa-solid fa-trash"></i></a></td>
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
    computed:{
        savedForms() {
            return this.$store.state.forms;
        }
    },

};
</script>