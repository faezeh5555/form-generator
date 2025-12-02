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
                        <tr v-for="(formItems, formName) in  paginatedForms" :key="formName">
                            <td>{{ formName }}</td>
                            <td><router-link :to="`/form/view/${formName}`"><i class="fa-solid fa-eye"></i></router-link></td>
                            <td @click="onClick_deleteForm(formName)"><a ><i class="fa-solid fa-trash"></i></a></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">
                                <button @click="changePage('prev')" :disabled="currentPage === 1"><i class="fa-regular fa-square-left"></i></button>
                                <span> {{ currentPage }} of {{ totalPages }}</span>
                                <button @click="changePage('next')" :disabled="currentPage === totalPages"><i class="fa-regular fa-square-right"></i></button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    </main>
</template>
<script>
export default {
    data(){
        return{
            currentPage: 1,  
            itemsPerPage: 3, 
        }
    },
    methods:{
        /**************|onclick-methods|*************/
        onClick_deleteForm(formName){
            this.$store.commit('deleteForm', formName);
        },
        /**************|other methods|****************/
        changePage(direction) {
            if (direction === 'next' && this.currentPage < this.totalPages) {
                this.currentPage++;
            } else if (direction === 'prev' && this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
    computed:{
        savedForms() {
            return this.$store.state.forms;
        },

        /******************|pagination| */
        totalPages() {
            return Math.ceil(Object.keys(this.savedForms).length / this.itemsPerPage);
        },
        paginatedForms() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const formsKeys = Object.keys(this.savedForms); 
            const paginatedKeys = formsKeys.slice(start, end); 

             
            return Object.fromEntries(
                paginatedKeys.map(key => [key, this.savedForms[key]]) 
            );
        },
    },

};
</script>