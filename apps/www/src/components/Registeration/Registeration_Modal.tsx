/** @format */

import React from 'react'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useRouter } from 'next/router'

import Spinner from '../Spinner/Spinner'

const Registeration_Modal = ({
  handleClose,
  show,
}: {
  handleClose: () => void
  show: boolean
}) => {
  const showHideClassName = show ? 'display-block' : 'display-none'

  const [spinner, setSpinner] = useState(false)
  const [serviceId, setServiceId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [sendSuccess, setSendSuccess] = useState(false)
  const [data, setData] = useState({
    name: '',
    username: '',
  })
  const [verifyCode, setVerifyCode] = useState('')
  const [successRegister, setSuccessRegister] = useState(false)
  const [recipientPhoneNumber, setRecipientPhonNumber] = useState<any>('')

  const router = useRouter()

  const { ref } = router.query

  const onHandleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onCodeChange = (e: any) => {
    setVerifyCode(e.target.value)
  }

  const onBack = (e: any) => {
    setSendSuccess(false)
    setData({ name: '', username: '' })
  }

  const onSendMessage = async (e: any) => {
    e.preventDefault()

    let phoneValidate = false
    if (recipientPhoneNumber) {
      phoneValidate = await isValidPhoneNumber(recipientPhoneNumber)
    }

    if (phoneValidate && data.name.trim().length !== 0) {
      setError('')

      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: recipientPhoneNumber }),
      })

      const apiResponse = await res.json()

      if (apiResponse.messageSuccess) {
        setSendSuccess(true)
        setRecipientPhonNumber(apiResponse.recipientPhoneNumber)
        setServiceId(apiResponse.serviceId)
      } else {
        setSendSuccess(false)
        return setError(apiResponse.error)
      }
    } else if (data.name.trim().length === 0) {
      return setError('O campo Nome é obrigatório.')
    } else {
      return setError('O tipo de número de telefone é inválido.')
    }
  }

  const onVerifyCode = async (e: any) => {
    e.preventDefault()

    setSpinner(true)
    const res = await fetch('/api/verifyCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verifyCode, recipientPhoneNumber, serviceId }),
    })

    const apiResponse = await res.json()

    if (apiResponse.verifyStatus) {
      setError('')
      const resCreate = await fetch('/api/userCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, recipientPhoneNumber, ref }),
      })

      const CreateResponse = await resCreate.json()

      if (CreateResponse.registermessage) {
        setSuccessRegister(true)
        setSpinner(false)

        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: CreateResponse.name,
            username: CreateResponse.username,
            phone: CreateResponse.phonenumber,
          }),
        }).then((res) => {
          if (res.status === 200) {
            // localStorage.setItem("user_id", data.name);
            // localStorage.setItem("user_name", data.name);
            // localStorage.setItem("phone", recipientPhoneNumber);
            router.push('https://www.bets.com.br/conta/cadastro/sucesso')
          } else {
            console.log('error')
          }
        })
      } else {
        setSuccessRegister(false)
        setSpinner(false)
        setError(CreateResponse.error)
      }
    } else {
      setSpinner(false)
      setError('verification is incorrect')
    }
  }

  return (
    <>
      <div className={showHideClassName} id="registration">
        <div className="modal-inner regist_max-w-md regist_w-full regist_bg-white regist_rounded regist_overflow-hidden total">
          <div className="modal-head flex flex-wrap justify-between px-4 py-2 bg-red">
            <div className="modal__title">
              <h5 className="m-0 regist_text-white regist_h5">Cadastro</h5>
            </div>
            <div className="modal__button">
              <button
                className="popup-close flex items-center text-white"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="regist_h-6 regist_w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="modal-body">
            <div className="relative mb-3 z-10">
              <img
                src="/img/bets_black.png"
                alt="ball"
                className="inline-block modal__logo"
              />
            </div>

            <div className="regist__main-titles mb-4 mx-auto block mt-6">
              <div className="main__title">
                <h4 className="regist_h4 regist_text-white regist_bg-primary regist_py-2 regist_px-3 regist_xl:text-3xl regist_m-0 regist_w-fit regist_mx-auto ">
                  BÔNUS DE ATÉ
                  <span className="regist_font-bold">R$200</span>
                </h4>
              </div>
              <div className="main__subtitle">
                <h5 className="regist_h5 regist_bg-secondary regist_text-white regist_py-2 regist_px-3 regist_m-0 regist_w-fit regist_mx-auto">
                  PARA NOVOS CLIENTES
                  {/* <!-- <span className="font-bold">R$50</span> --> */}
                </h5>
              </div>
            </div>

            <div className="regist__form-wrap">
              <h6 className="regist_mb-4 regist_text-center regist_h6 !text-black">
                Verificação de número de celular
              </h6>

              {!sendSuccess ? (
                <form className="registration_form" id="input_div">
                  <div className="inner_input_f">
                    {/* <div className="form-control relative number-field">
                      <span style={{ color: 'black' }}>
                        Criar um nome de usuário
                      </span>
                      <input
                        type="text"
                        name="username"
                        className="nameinput"
                        placeholder="BET_"
                        onChange={onHandleChange}
                      />
                    </div> */}
                    <div className="form-control relative number-field">
                      <span style={{ color: 'black' }}>Nome e Sobrenome</span>
                      <input
                        type="text"
                        name="name"
                        className="nameinput"
                        placeholder="Nome"
                        onChange={onHandleChange}
                      />
                    </div>

                    <div className="relative number-field">
                      <span style={{ color: 'black' }}>Número de telefone</span>
                      <PhoneInput
                        id="phone-input"
                        international
                        defaultCountry="BR"
                        value={recipientPhoneNumber}
                        onChange={setRecipientPhonNumber}
                      />
                      <p
                        id="phone-error"
                        style={
                          error ? { display: 'block' } : { display: 'none' }
                        }
                      >
                        <span
                          style={{ color: 'red', fontSize: '12px' }}
                          id="phone-error-text"
                        >
                          {error}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={onSendMessage}
                    className="regist_btn regist_btn-primary regist_rounded regist_w-full uppercase regist_mt-4 regist_text-sm regist_py-3"
                  >
                    Cadastro
                  </button>
                </form>
              ) : (
                <form className="verify_div" onSubmit={onVerifyCode}>
                  <div
                    className="relative number-field"
                    style={
                      successRegister
                        ? { display: 'none' }
                        : { display: 'block', zIndex: '9999999999' }
                    }
                  >
                    <input
                      id="code"
                      type="tel"
                      name="code"
                      className="form-control"
                      onChange={onCodeChange}
                      placeholder="Digite o código de verificação"
                    />
                    <button
                      type="submit"
                      className="regist_btn regist_btn-primary regist_rounded regist_w-full uppercase regist_mt-4 regist_text-sm regist_py-3"
                      disabled={spinner ? true : false}
                      style={
                        spinner ? { opacity: '0.6', cursor: 'not-allowed' } : {}
                      }
                    >
                      <Spinner />
                      Verificar telefone{' '}
                      {spinner ? (
                        <Spinner
                          styles={{ width: '25px', marginLeft: '25%' }}
                        />
                      ) : (
                        ''
                      )}
                    </button>
                  </div>

                  <div
                    style={
                      successRegister
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    <p style={{ marginLeft: '25%' }}>
                      ✔️ Registro bem-sucedido.
                    </p>
                  </div>
                  <div
                    id="vcode-error"
                    style={error ? { display: 'block' } : { display: 'none' }}
                  >
                    <span
                      className="modal__error-message"
                      id="vcode-error-text"
                    >
                      {error}
                    </span>

                    <div>
                      <button
                        type="button"
                        onClick={onBack}
                        className="modal__error-message-link"
                      >
                        Tente se cadastrar novamente
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <h6 className="regist_font-medium regist_mt-4 regist_text-center">
                já tem uma conta?{' '}
                <a
                  href="https://pro.bets.com.br/"
                  className="regist_underline regist_text-primary"
                >
                  Entrar
                </a>
              </h6>
              <div
                className="regist_border-t regist_border-gray-200 grid regist_gap-y-3 regist_pt-4"
                id="tnc_div_id"
              >
                <label className="regist_text-xs regist_flex regist_items-center regist_gap-x-2 regist_text-black">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border rounded"
                    id="terms_conditions"
                    defaultChecked
                  />
                  Eu concordo com{' '}
                  <a
                    href="https://www.bets.com.br/bets-termos"
                    className="regist_text-primary regist_underline"
                    target="_blank"
                  >
                    termos e Condições
                  </a>
                  <p
                    id="tnc-error"
                    style={{ display: 'none', textAlign: 'left' }}
                  >
                    <span
                      style={{ color: 'red', fontSize: '12px' }}
                      id="tnc-error-text"
                    ></span>
                  </p>
                </label>

                <label className="regist_text-xs regist_flex regist_items-center regist_gap-x-2 regist_text-black">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border rounded"
                    defaultChecked
                  />
                  Receba newsletters sobre promoções por e-mail e sms
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registeration_Modal
