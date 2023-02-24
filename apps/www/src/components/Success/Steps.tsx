import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

export default function Steps() {
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);

    const openModal = () => {
        setModal(!modal);
      };
    
      const spinner = () => {
        setVideoLoading(!videoLoading);
      };
  

    return (
        <>
            <section className="steps bg-white md:pt-56 md:-mt-[90px] md:pb-20 index-10">

                <div className="container">
                    <div className="flex flex-wrap w-full">
                        <div className="w-full lg:w-1/3 md:px-14 mb-10 mt-12 lg:mt-0">
                            <div className="shadow-lg border-2 border-[#004c8f] text-center pt-5 pb-5 pl-12 pr-12 rounded h-full flex flex-col relative steps__next">
                                <div className="-mt-[50px]">
                                    <Image
                                                src="/img/numb-1.png"
                                                alt="number-1"
                                                width={'60'}
                                                height={'60'}
                                    />
                                </div>

                                <p className="font-semibold mt-5">
                                    Assista ao vídeo
                                </p>

                                <div className="mt-5">
                                    <Image
                                                src="/img/icon-1.png"
                                                alt="icon-1"
                                                width={'50'}
                                                height={'50'}
                                    />
                                </div>

                                <p className="pt-5">
                                    Assista ao vídeo para entender como utilizar a plataforma.
                                </p>

                                <button onClick={openModal} className="w-full mt-auto">
                                    <div className="video__button p-2.5 bg-[#004c8f] text-white mt-5 w-full">
                                         Clique para ver o Vídeo
                                    </div>
                                    
                                    {modal ? (
                                    <section className="modal__bg">
                                        <div className="modal__align">
                                            <div className="modal__content">
                                
                                                <div className="modal__video-align">
                                                    {videoLoading ? (
                                                        <div className="modal__spinner">
                                                        </div>
                                                    ) : null}

                                                    
                                                    <IoCloseOutline
                                                        className="modal__close"
                                                        arial-label="Close modal"
                                                    />
                                                    
                                                    <iframe
                                                        className="modal__video-style"
                                                        onLoad={spinner}
                                                        loading="lazy"
                                                        width="800"
                                                        height="500"
                                                        src="https://iframe.videodelivery.net/5b78b5357357498abbcf1a5c8aefdd99?autoplay=true&poster=https%3A%2F%2Fwww.bets.com.br%2F"
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    ) : null}
                                </button>
                            </div>

                        </div>
                        <div className="w-full lg:w-1/3 md:px-14 mb-10">
                            <div className="shadow-lg border-2 border-[#004c8f] text-center  pt-5 pb-5 pl-12 pr-12 rounded h-full flex flex-col relative steps__next">
                                <div className="-mt-[50px]">
                                    <Image
                                                src="/img/numb-2.png"
                                                alt="number-2"
                                                width={'60'}
                                                height={'60'}
                                    />
                                </div>

                                <p className="font-semibold mt-5">
                                    Depósito
                                </p>

                                <div className="mt-5">
                                    <Image
                                                src="/img/icon-2.png"
                                                alt="icon-2"
                                                width={'230'}
                                                height={'50'}
                                    />
                                </div>

                                <p className="pt-5">
                                    Depositar dinheiro usando moeda criptográfica ou PIX
                                </p>
                                <p className="text-[10px] pt-2.5">
                                    Deposite R$ 200 reais ou mais e ganhe R$ 200 de crédito grátis
                                </p>

                                <div className="pt-5 mt-auto">
                                    <Link href='https://www.bets.com.br/conta/pagamentos/deposito'>
                                        <a className="p-2.5 bg-[#004c8f] text-white min-w-[120px] block" target="_blank">
                                        Deposite aqui
                                        </a>
                                    </Link>
                                </div>
                                

                            </div>

                        </div>
                        <div className="w-full lg:w-1/3 md:px-14 mb-10">
                            <div className="shadow-lg border-2 border-[#004c8f] text-center pt-5 pb-5 pl-12 pr-12 rounded h-full flex flex-col">
                                <div className="-mt-[50px]">
                                    <Image
                                                src="/img/numb-3.png"
                                                alt="number-3"
                                                width={'60'}
                                                height={'60'}
                                    />
                                </div>

                                <p className="font-semibold mt-5">
                                    Depósito
                                </p>

                                <div className="mt-5">
                                    <Image
                                                src="/img/icon-3.png"
                                                alt="icon-3"
                                                width={'50'}
                                                height={'50'}
                                    />
                                </div>

                                <p className="pt-5">
                                    Assista ao vídeo para entender como utilizar a plataforma.
                                </p>
                                
                                <div className="pt-5 mt-auto">
                                    <Link href='https://pro.bets.com.br/login?next=/trade'>
                                        <a className="p-2.5 bg-[#004c8f] text-white min-w-[120px] block" target="_blank">
                                            Fazer o login
                                        </a>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
        
        </>
    )
}