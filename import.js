import fs from 'fs';
const dataBuffer = fs.readFileSync("database/all_data_array.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

export const original = data;

export const test = (num) => {
    return data[num];
}

export const listFromTo = (from, to) => {
return data.filter((item)=>(item.order >= from && item.order<=to));
}


export const listAll = () => {
    return data;
}