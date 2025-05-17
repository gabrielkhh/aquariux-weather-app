import axios from "axios";

export const searchLocation = async (searchTerm: string) => {
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&appid=5796abbde9106b7da4febfae8c44c232&units=metric`);
    if (result.status === 200) {
        return result.data;
    }
    console.warn(`The search for locations resulted in status code ${result.status}`, result.data)
    return undefined
}