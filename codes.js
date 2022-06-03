import fs from "fs";
import {original} from "./import";

const dataBuffer = fs.readFileSync("database/codes.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

export const addCode = (id, newCode, newTheme) => {
    const index = data.findIndex((item) => item.post_id === id);
    if (index < 0) {
        return false;
    } else {
        const themes = data[index].themes;
        data[index].codes.push(newCode);
        newTheme.forEach((themeToAdd) => {
            if (
                themes.findIndex((theme) => {
                    return theme.theme === themeToAdd.theme;
                }) < 0) {
                data[index].themes.push(themeToAdd);
            }
        })
        fs.writeFileSync('database/codes.json', JSON.stringify(data));
        return data;
    }
    return "error";
}

export const addValidity = (id, newValidity) => {
    const index = data.findIndex((item) => item.post_id === id);
    if (index < 0) {
        return false;
    } else {
        data[index].isValid = newValidity;
        fs.writeFileSync('database/codes.json', JSON.stringify(data));
        return data;
    }
}

export const customAll = () => {
    return data;
}

export const checkCode = (id) => {
    return data.findIndex((item) => item.id === id);
}

export const codeInit = () => {
    const newData = original.map((item) => {
        return {post_id: item.post_id, isValid: 0, codes: [], themes: []}
    })
    fs.writeFileSync('database/codes.json', JSON.stringify(newData));
    return "success"
}