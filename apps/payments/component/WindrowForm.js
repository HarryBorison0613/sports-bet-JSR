import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function WindrowRequest() {
  const [value, setValue] = useState("BRL");
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [pix, setPix] = useState('')
  const [modal, setModal] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) { 
    e.preventDefault()
    console.log('Sending')
  let data = {
      name,
      email,
      amount,
      value,
      pix
    }

    await fetch('/conta/pagamentos/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received',  res)
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setAmount('')
        setValue('')
        setPix('')
        setModal(true)
      }
    })
  }

  return (
    <>
      <section className="form">
        
      <div className="form__container">
            <p className="heading-method">
                 Pedido de saque
            </p>
          <form className="main" >
              <div className="inputGroup" >
                < label htmlFor='name'>Nome de usuário</label>
                < input type='text' name='name' className="inputField" value={name} onChange={(e)=>{setName(e.target.value)}} />  
              </div>

            <div className="row form__row">
              
              <div className="inputGroup col-8 value" >
                < label htmlFor='amount'>Valor</label>
                < input type='number' name='amount' value={amount} className="inputField" onChange={(e)=>{setAmount(e.target.value)}}  />  
              </div>

              <div className="inputGroup col-4 value" >
              <select value={value} onChange={(e) => { setValue(e.target.value); }}>
                <option value="BRL">BRL R$</option>
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
              </select> 

            </div>
            </div>
            
           
              <div className="inputGroup" >
                < label htmlFor='email'>Email</label>
                < input type='email' name='email' className="inputField"  value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="inputGroup" >
                < label htmlFor='pix'>PIX (CPF / Email / Telephone)</label>
                < input type='number' name='pix' className="inputField" value={pix}  onChange={(e)=>{setPix(e.target.value)}} />  
              </div>
            
            
              <div className="center">
                < input type='submit' value="Solicitar" className="btn btn-primary btn--small" onClick={(e)=>{handleSubmit(e)}}/>
              </div>
          </form >
          <div className={`success-modal heading-method ${modal == true ? 'is-active' : null}`}>
            Sua solicitação está sendo processada, entraremos em contato em breve.

            <Link href="https://pro.bets.com.br/login">
                <a className="btn btn--small btn-tertiary">
                  Voltam
                </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
