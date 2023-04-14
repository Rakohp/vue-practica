import { settingHttp } from "../connection/https";
export const setConnection = () => {
    const server = process.env.NODE_ENV;
    console.log(server)
    console.log(process.env)
    settingHttp.urlBase = server === 'development' ? "https://localhost:7229/" : process.env.VUE_APP_SERVER;
}

