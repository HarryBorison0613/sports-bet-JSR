import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import Image from "next/image";
import Decor from "src/components/Success/Layout/Decor";

export default function VideoPopup() {
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
            <section className="video container relative">
                <div className="heading-container">
                    <h1>
                        Bem-vindo à Melhor Plataforma de
                        <br /> Apostas Esportivas do Brasil
                    </h1>
                    <p>+1.000 de assinaturas por dia</p>
                </div>
                
                <Decor />

                <div className="text-center">

                    <button onClick={openModal} className="">
                        <div className="video__placeholder">
                            {/* <AiFillPlayCircle
                                className="video__play" 
                            /> */}
                            <Image
                                    src="/img/video_placeholder.png"
                                    alt="video"
                                    width={'1086'}
                                    height={'627'}
                                    id='video'
                            />
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

            </section>
        
        </>
    )
}