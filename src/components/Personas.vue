<style scoped>
th {
    background-color: aliceblue !important;
    color: #555 !important;
}


.v-data-footer {
    font-size: small !important;
    height: 45px !important;
    padding-top: 1px !important;
}

.v-data-footer__select {
    padding-bottom: 0 !important;
    margin-top: -15px !important;
    margin-bottom: -15px !important;
}

.v-text-field--solo {
    font-size: small !important;
    font-size: 12px !important;

}

.v-label {
    font-size: small !important;
    font-size: 12px !important;
}

.v-data-footer {
    font-size: small !important;
    height: 45px !important;
    padding-top: 1px !important;
}

.v-data-footer__select {
    padding-bottom: 0 !important;
    margin-top: -15px !important;
    margin-bottom: -15px !important;
}
</style>
<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-card ref="form" v-if="showme">
                    <v-card-text>
                        <v-text-field id="name" ref="name" v-model="name"
                            :rules="[() => !!name || 'This field is required']" label="Dessert (100g serving)"
                            placeholder="Dessert (100g serving)" dense required clearable solo></v-text-field>
                        <v-text-field ref="calories" v-model="calories" @keypress="Filter($event)" label="Calories" dense
                            required clearable solo
                            :rules="[() => calories > 0 || 'This field is required']"></v-text-field>
                        <v-text-field ref="fat" v-model="fat" @keypress="Filter($event)" label="Fat (g)" dense required
                            clearable solo :rules="[() => calories > 0 || 'This field is required']"></v-text-field>
                        <v-text-field ref="carbs" v-model="carbs" @keypress="Filter($event)" label="Carbs (g)" dense
                            required clearable solo
                            :rules="[() => calories > 0 || 'This field is required']"></v-text-field>
                        <v-text-field ref="protein" v-model="protein" @keypress="Filter($event)" label="Protein (g)" dense
                            required clearable solo
                            :rules="[() => calories > 0 || 'This field is required']"></v-text-field>
                        <v-text-field ref="iron" v-model="iron" @keypress="Filter($event)" label="Iron (%)" dense required
                            clearable solo :rules="[() => calories > 0 || 'This field is required']"></v-text-field>
                    </v-card-text>
                    <v-divider class="mt-1"></v-divider>
                    <v-card-actions>
                        <v-btn color="red" text @click="showme = false" small>
                            Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-slide-x-reverse-transition>
                            <v-tooltip v-if="formHasErrors" left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon class="my-0" v-bind="attrs" @click="ResetForm" v-on="on">
                                        <v-icon>mdi-refresh</v-icon>
                                    </v-btn>
                                </template>
                                <span>Refrescar</span>
                            </v-tooltip>
                        </v-slide-x-reverse-transition>
                        <v-btn color="primary" text @click="Submit" small>
                            Agregar
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <div class="d-flex">
                    <v-btn small color="primary" dark v-if="!showme" @click="showme = true">
                        Nuevo
                    </v-btn>
                </div>
            </v-col>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="desserts" item-key="name" class="elevation-4"
                    :hide-default-footer="true" :loading="loading" :options.sync="options"></v-data-table>
            </v-col>
            <v-col cols="6">
                <p>
                    Ask a yes/no question:
                </p>
            </v-col>
            <v-col cols="6">
                <v-text-field label="Ricardo" solo dense v-model="question" :loading="loading"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-chip color="purple" label outlined>
                    {{ answer }}
                </v-chip>
            </v-col>
        </v-row>
    </v-container>
</template> 
<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
    name: 'PersonasComponente',
    data() {
        return {
            showme: true,
            errorMessages: '',
            name: null,
            calories: null,
            fat: null,
            carbs: null,
            protein: null,
            iron: null,
            formHasErrors: false,
            question: '',
            answerInput: 'Las preguntas deben contener el símbolo "?" ;)',
            answer: '',
            loading: false,
            desserts: [],
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'start',
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
            ],
            options: {
                page: 1,
                itemsPerPage: -1,
                sortBy: [],
                sortDesc: [],
            }
        }
    },
    beforeCreate() {
        console.log('se va a crear el componente..')
        // console.log(this.answerInput)
        // alert('Creando..')
    },
    created() {
        console.log('creando el componente..')
        console.log(this.answerInput)
    },
    beforeMount() {
        console.log('antes de montar..')
        // alert('Montando..')
    },
    async mounted() {
        await this.GetPersonas();
        this.answer = this.answerInput;
    },
    watch: {
        options: {
            async handler() {
                console.log('hi')
                await this.GetPersonas()
            },
            deep: true
        },
        question(newQuestion) {
            console.log('.')
            if (newQuestion.includes('?')) this.GetAnswer();
            else this.answer = this.answerInput
        },
        name() {
            this.errorMessages = ''
        }
    },
    computed: {
        ...mapState("personas", ["Personas","Persona"]),
        form() {
            return {
                name: this.name,
                calories: this.calories,
                fat: this.fat,
                carbs: this.carbs,
                protein: this.protein,
                iron: this.iron,
            }
        },
    },
    methods: {
        ...mapActions("personas", ["getPersonas", "setPersona"]),
        ...mapMutations("personas", ["set_Personas", "set_Persona"]),
        Filter(evt) {
            evt = (evt) ? evt : window.event;
            let expect = evt.target.value.toString() + evt.key.toString();

            if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        async GetAnswer() {
            this.loading = true;
            this.answer = 'Pensando...'
            try {
                const res = await fetch('https://yesno.wtf/api')
                this.answer = (await res.json()).answer.toUpperCase()
            } catch (error) {
                this.answer = 'Error! Could not reach the API. ' + error
            }
            this.loading = false;
        },
        ResetForm() {
            this.errorMessages = []
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                this.$refs[f].reset()
            })
        },
        async Submit() {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.formHasErrors = true
                
                this.$refs[f].validate(true)
            })
            if (!this.formHasErrors) {
                await this.add(this.form);
                this.ResetForm();
            }
        },
        async add(item) {
            await this.setPersona(item);
            // console.log(this.Persona);

            await this.GetPersonas();
        },
        async GetPersonas() {
            await this.getPersonas();
            this.desserts = this.Personas
        }
    }
}
</script>
  