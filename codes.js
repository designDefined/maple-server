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

export const addTheme = (id, newTheme) => {
    const index = data.findIndex((item) => item.post_id === id);
    if (index < 0) {
        return false;
    } else {
        data[index].themes.push(newTheme);
        fs.writeFileSync('database/codes.json', JSON.stringify(data));
        return data;
    }
    return "error";
}

export const deleteTheme = (id, themeToDelete) => {
    const index = data.findIndex((item) => item.post_id === id);
    if (index < 0) {
        return false;
    } else {
        const indexToDelete = data[index].themes.findIndex((item) => item === themeToDelete);
        if (indexToDelete !== -1) {
            data[index].themes.splice(indexToDelete, 1);
        }
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

export const addIdToCode = (codes, order) => {
    return codes.map((code, index) => {
        return {...code, code_id: order * 100 + index}
    })
}

export const addIdToAll = () => {
    const newData = data.map((item) => {
        const source = original.find((origin) => {
            return origin.post_id === item.post_id
        })
        return {...item, codes: addIdToCode(item.codes, source.order)}
    })
    fs.writeFileSync('database/codes.json', JSON.stringify(newData));
    return "success"
}


export const jsonToCSV = () => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
        const data_code = data[i].codes;
        for (let j = 0; j < data_code.length; j++) {
            newData.push(data_code[j]);
        }
    }
    fs.writeFileSync('database/codes_export.json', JSON.stringify(newData));
}