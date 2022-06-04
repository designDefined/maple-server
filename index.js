`use strict`

import express from "express"
import {listAll, listFromTo, test} from "./import";
import {addCode, addIdToAll, addValidity, checkCode, codeInit, customAll, testValidity} from "./codes";
import cors from "cors";

const app = express()
const port = 5000
let isWorking = {status: false};

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send("pong");
})
app.get('/list', (req, res) => {
    res.send({isSuccess: true, payload: listAll()})
});

app.get(`/custom`, (req, res) => {
    res.send({isSuccess: true, payload: customAll()})
})

app.route(`/valid/:post_id`).post((req, res) => {
    if (!isWorking.status) {
        isWorking.status = true;
        const response = addValidity(Number(req.params.post_id), req.body.value);
        if (response) {
            res.send({isSuccess: true, payload: response});
        } else {
            res.send({isSuccess: false, error_code: 2, error_id: req.params.post_id});
        }
        isWorking.status = false;
    } else {
        res.send({isSuccess: false, error_code: 1});
    }
})

app.route(`/code/:post_id`)
    .post((req, res) => {
        if (!isWorking.status) {
            isWorking.status = true;
            const response = addCode(Number(req.params.post_id), req.body.codes, req.body.themes);
            if (response) {
                res.send({isSuccess: true, payload: response});
            } else {
                res.send({isSuccess: false, error_code: 2, error_id: req.params.post_id});
            }
            isWorking.status = false;
        } else {
            res.send({isSuccess: false, error_code: 1});
        }
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})