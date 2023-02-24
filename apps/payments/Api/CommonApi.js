import React from 'react'
import axios from 'axios'


export const invoiceGenerator = (method, data) => {
    return axios({
        method: method,
        url: process.env.NEXT_PUBLIC_INVOICE_GENERATE_URL,
        data: data
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const getQrCodeScanner = (data) => {
    return axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_QRCODE_URL,
        data: data
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const paymentStatus = (data) => {
    return axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_PAYMENT_STATUS,
        data: data,
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const payPaymentApi = (data) => {
    return axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_API_PAYMENT,
        data: data,
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}