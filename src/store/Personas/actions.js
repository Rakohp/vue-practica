import { http } from "@/connection/https";

export const getPersonas = async ({ commit }, payload) => {
    let resp = await http.get('People', payload);
    commit("set_Personas", resp.data);
};

export const setPersona = async ({ commit }, payload) => {
    let resp = await http.post('People', payload);
    commit("set_Persona", resp.data);
};