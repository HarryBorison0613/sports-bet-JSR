/** @format */

import Head from 'next/head'
import Link from '@app/link'
import { useState } from 'react'
import Registeration_Modal from './Registeration_Modal'

const Registeration = () => {
  const [show, setShow] = useState(false)

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  

  return (
    <>
      <Head>
        <title>Bets.com.br Registration</title>
        <meta
          name="apostas esportiva, notícias , Brasil"
          content="O maior site de conteúdo esportivo, notícias e apostas do Brasil. R$200 de bônus com a inscrição!"
        />
        <link rel="icon" href="/icons/free_logo.png" />
      </Head>
      <main className="register" style={{backgroundImage: "url('/img/custom-background.jpg')"}}>
        <div className="register__wrap relative" style={show ? { filter: 'brightness(0.5)' } : { filter: 'none' }} id="registration">
          <img
            src="/img/glare.png"
            alt="image"
            className="main__background_first absolute regist_h-full regist_w-full regist_object-cover regist_left-0 regist_top-0 regist_opacity-0"
          />
          <img
            src="/img/soffit.png"
            alt="image"
            className="regist_main__background_second absolute regist_h-full regist_w-full regist_object-cover regist_left-0 regist_top-0 regist_opacity-0"
          />

          <div className="register__animated absolute regist_top-1/2 regist_-translate-y-1/2 regist_right-[-37vw] regist_w-[90vw] regist_h-[53vw]">
            <div className="main__person regist_main__person_first">
              <img src="/img/custom-men.png" alt="man" />
            </div>
          </div>
          <div className="container regist_max-w-5xl relative regist_min-h-screen flex regist_flex-col" >
            <div className="regist_py-5 regist_text-center regist_sm:text-left"></div>

            <div className="registration__container relative mobile_reverse regist_gap-y-10 flex regist_flex-col-reverse regist_sm:flex-col regist_items-start justify-center regist_flex-grow regist_py-5">
              <div>
                <div className="regist__main-titles regist_mb-20">
                  <div className="main__title">
                    <a href="" className="register__logo inline-block">
                      <img
                        src="/img/bets.png"
                        alt="bets"
                        width="140"
                      />
                    </a>
                    <h6 className="regist_bg-white regist_text-[#ff4020] regist_py-3 regist_px-5 regist_m-0 regist_md:text-4xl regist_lg:text-5xl regist_xl:text-4xl regist_w-fit">
                      <span className="main__title-first regist_font-bold">BÔNUS DE ATÉ</span>
                      <span className="main__title-second regist_font-bold">
                        <strong>R$200</strong>
                      </span>
                    </h6>
                  </div>
                  <div className="main__subtitle">
                    <h6 className="regist_bg-secondary regist_text-white regist_py-3 regist_px-5 regist_m-0 regist_md:text-3xl regist_lg:text-4xl regist_xl:text-4xl regist_w-fit">
                      <span className="main__subtitle-first regist_font-bold">
                        PARA NOVOS CLIENTES
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="flex flex-wrap regist_gap-x-5 regist_items-center ganhe_box">
                  <button
                    type="button"
                    className="regist__btn regist_cursor-pointer regist_btn regist_btn-primary popup-btn popup-trigger"
                    id="btng"
                    style={{width: '400px'}}
                    onClick={showModal}
                  >
                    CADASTRE-SE E GARANTA SEU BÔNUS
                  </button>
                  <a
                    href="https://www.bets.com.br/bonus"
                    className="regist_underline hover:no-underline"
                    target="_blank"
                    style={{color: 'black'}}
                  >
                    Condições do Bônus
                  </a>
                </div>
              </div>
              <div className="regist_flex flex-wrap regist_gap-5 regist_text-white icon_txt_sec regist_sm:text-black">
                <div className="regist_flex regist_items-center regist_gap-x-2">
                  <img src="/img/icons8.png" alt="ic8" width="30" />
                  <p className="regist_sm:text-black">
                    Altas Probabilidades
                  </p>
                </div>
                <div className="regist_flex regist_items-center regist_gap-x-2">
                  <img src="/img/networking-64.png" alt="ic8" width="30" />
                  <p className="regist_sm:text-black">
                    Jogue com segurança e confiança
                  </p>
                </div>
                <div className="regist_flex regist_items-center regist_gap-x-2">
                  <img src="/img/coins-64.png" alt="ic8" width="30" />
                  <p className="regist_sm:text-black">Pague com PIX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Registeration_Modal show={show} handleClose={hideModal} />
      </main>
    </>
  )
}

export default Registeration
