import React, { useEffect, useState } from 'react'
import { Button, Input, notification, Form, Spin } from 'antd';
import PayScanner from './PayScanner';
import CpfNumber from './CpfNumber';
import { Telegram, YouTube, Instagram, Twitter, FaceBook, WhitePolygon, GreenPolygon, GreyPolygon } from '../styles/icons';
import FloatingPer from './FloatingPer';
import { getQrCodeScanner, invoiceGenerator } from '../Api/CommonApi';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Image from "next/image";

const PixPayment = (props) => {

  const { query: { payment, motive } = {} } = useRouter()

  useEffect(() => {
    if (payment == "success") {
      toast.success("Payment Transferred Successfully");
    }

    else if (motive) {
      toast.error(motive);
    }

    if (motive || payment)
      setTimeout(() => {
        window.location.replace(window.location.origin);
      }, 3000);
  }, [motive, payment]);

  const { isOpen, setIsOpen } = props || {}
  const user = {}

  const [clickValue, setClickValue] = useState({ btnVal: '', inputVal: '', showError: '', cpfNo: '', username: '', selectfield: 'CPF/CNPF' })
  const [QrCode, setQrCode] = useState({})
  const [invoice, setInvoice] = useState('')
  const [cpfModal, setCpfModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)
  const [errorText, setErrorText] = useState('')

  const amtData = [{ value: 50 }, { value: 250 }, { value: 500 }]

  //PAy4fun Integration

  const Pay4fun = async () => {
    if (!clickValue.inputVal) {
      return toast.error("Please select the amount")
    }
    const { data } = await axios.post('/conta/pagamentos/api/pay4fun', {
      "amount": clickValue.inputVal,
    })
    const { url } = data;
    url && window.open(url)
  }

  const pay4funGo = async () => {
    try {
      if (!parseInt(clickValue.inputVal) || parseInt(clickValue.inputVal) < 10) {
        return toast.error("Selecione ou insira o valor igual ou superior a 10")
      }
      const { data } = await axios.post('/conta/pagamentos/api/pay4funGo', {
        "amount": clickValue.inputVal,
      })
      const { url } = data;
      url && window.open(url)
    } catch (e) {
      console.log(e?.data?.message)
    }
  }

  const handleClick = async () => {
    if (clickValue?.username === '') {
      return false
    } else if (clickValue.btnVal === '' && clickValue.inputVal === '') {
      setClickValue({ ...clickValue, showError: 'Por favor, insira o valor' })
    } else {
      setLoading(true)
      const res = await invoiceGenerator('get', '')
      if (res) {
        setLoading(false)
        setInvoice(res?.data?.invoiceNumber)
      }
      setCpfModal(true)
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const getQRCde = async () => {
    if (clickValue?.selectfield == 'Email') {
      if (validateEmail(clickValue?.cpfNo) == null) {
        setClickValue({ ...clickValue, showError: 'Please enter valid email' })
        return
      }
    }
    const imvoiceCode = clickValue?.username + invoice
    let dataToSend = {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      invoice: imvoiceCode,
      amount: clickValue?.inputVal,
      description: `Payment Invoice #${imvoiceCode}`,
      customer_name: "mark robert ross neal",
      document: clickValue?.cpfNo,
      phone: "5541999792071",
      email: "suporte@bets.com.br"
    }
    // if (clickValue?.selectfield == 'CPF/CNPF') {

    //     dataToSend.phone= "5541999792071"
    //     dataToSend.email= "suporte@bets.com.br"
    // } else if(clickValue?.selectfield == 'Email'){
    //     dataToSend.email = clickValue?.cpfNo
    //     dataToSend.document = '01025091906'
    //     dataToSend.phone= "5541999792071"
    // }else{
    //     dataToSend.phone = clickValue?.cpfNo
    //     dataToSend.email = 'suporte@bets.com.br'
    //     dataToSend.document = '01025091906'
    // }

    setLoading(true)
    const res = await getQrCodeScanner(dataToSend)
    setQrCode(res)
    if (res?.data?.Status === "200") {
      setCpfModal(false)
      document.getElementById("myForm").reset();
      invoiceGenerator('post', '')
      setLoading(false)
      setIsOpen(true)
      setImgLoading(true)
    } else {
      setCpfModal(false)
    }
  }

  const openAlert = () => {
    if (QrCode?.data?.Status === '500') {
      document.getElementById("myForm").reset()
      setLoading(false)
      setQrCode({})
      return notification.error({
        message: "Error",
        description: QrCode?.data?.Message
      });
    }
  }

  const onSubmitClick = () => {
    if (clickValue.cpfNo === '') {
      return
    }
    else {
      setErrorText('')
      getQRCde()
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <section className='container'>
        <div className='custom-modal'>
          <Form id="myForm"  >
            <div className='form-class'>
              <p className='heading-method'>Depositar dinheiro em <br />sua conta</p>
              <div className={`user-input ${!user ? 'payer' : 'payer-login'}`}>
                <div className='unlogin-user'>
                  <p>Digite seu nome de usuário aqui:</p>
                  <Form.Item
                    name="username"
                    className='amount-between'
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite o nome de usuário"
                      }
                    ]}
                  >
                    <Input disabled={loading} value={clickValue?.username} type='text' onChange={(e) => setClickValue({ ...clickValue, username: e?.target?.value, showError: '' })} className='input-amount' />
                  </Form.Item>
                </div>
              </div>

              <div className="val-deposit" >
                <p className='amount-between'>Valor do Depósito (R$50 - R$9.900):</p>
                <div className='rs-button-div'>
                  {(amtData || []).map((amt, key) => {
                    return (
                      <Button key={key} onClick={(e) => setClickValue({ ...clickValue, btnVal: amt?.value, inputVal: amt?.value, showError: '' })} className={clickValue?.btnVal === amt?.value ? 'click-rs-button' : 'rs-button'}>
                        R${amt?.value}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <p className='error-class'>{clickValue.showError}</p>
              <p className='heading-to'>ou</p>
              <Form.Item name="inputVal">
                <Input disabled={loading} value={clickValue.inputVal}
                  type='number'
                  min={1}
                  onWheel={event => event.target.blur()}
                  onKeyPress={(e) => {
                    if (e.code === 'Minus') {
                      e.preventDefault();
                    }
                  }}
                  pattern="\d*"
                  onChange={(e) => {
                    setClickValue({ ...clickValue, btnVal: '', inputVal: e?.target?.value, showError: '' })
                  }}
                  className='input-amount'
                  prefix='R$' />
                <p className='error-class'>{clickValue.showError}</p>
              </Form.Item>
            </div>
            <div className='input-amount-button row imput-buttons__row'>
              <div className='col-6 input-amount-button__col'>
              <Button htmlType="submit"
                // onClick={() => handleClick()}
                onClick={() =>
                  window.open('https://openpix.com.br/pay/e1a72041-874b-4ccc-b630-242e5ca875f0', '_blank')}
                size='large'>
                   <Image
                              src="/img/logo-pix.png"
                              alt="pix-logo"
                              width={'90'}
                              height={'70'}
                              id='pix-logo'
                          />
                </Button>
              </div> 
              <div className='col-6 input-amount-button__col'>
                <Button htmlType="submit" onClick={() =>
                  window.open('https://commerce.coinbase.com/checkout/b19b1646-9e50-479f-ac67-2a0a170efb10', '_blank')} size='large'>
                        <Image
                              src="/img/coinbase-litecoin.png"
                              alt="coinbase-logo"
                              width={'70'}
                              height={'50'}
                              id='coinbase-logo'
                          />
  
                  </Button>
              </div>

            </div>
            {/* <div className='input-amount-button row imput-buttons__row'>

              <div className='col-6 input-amount-button__col'>
                
                <Button htmlType="submit" onClick={() => Pay4fun()} size='large'>
                          <Image
                              src="/img/pay4fun.png"
                              alt="pix-logo"
                              width={'100'}
                              height={'40'}
                              id='pay4funImg'
                          />
                  
                </Button>
              </div>
              <div className='col-6 input-amount-button__col'>
              
                <Button htmlType="submit" onClick={() => pay4funGo()} size='large'>
                  <Image
                              src="/img/pay4funGo.png"
                              alt="pix-go-logo"
                              width={'120'}
                              height={'50'}
                              id='pay4funImg'
                          />
                </Button>
              </div>
              
            </div> */}
          </Form>
        </div>
    
        {openAlert()}
        {QrCode?.data?.Status === '200' &&
          <PayScanner
            invoice={invoice}
            imgLoading={imgLoading}
            setImgLoading={setImgLoading}
            setClickValue={setClickValue}
            isOpen={isOpen} setIsOpen={setIsOpen} user={user} QrCode={QrCode} clickValue={clickValue} />}
        {cpfModal &&
          <CpfNumber
            errorText={errorText}
            setErrorText={setErrorText}
            payAmount={() => onSubmitClick()}
            clickValue={clickValue}
            setClickValue={setClickValue}
            setCpfModal={setCpfModal}
            cpfModal={cpfModal}
            loading={loading}
            setLoading={setLoading}
            invoice={invoice}
          />
        }
        {loading && (
          <div className="spinner-class">
            <Spin />
          </div>
        )}
      </section>
    </>
  )
}
export default PixPayment;