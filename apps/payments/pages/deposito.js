import React, { useState } from "react";
import Payment from './payment';
import Layout from "/component/layouts/layout"

export default function Deposito() {
  const [isOpen, setIsOpen] = useState(false);
  return (


      <>
        <Layout>
          <Payment  setIsOpen={setIsOpen} isOpen={isOpen} />
        </Layout>
        
      </>
    
  )
}
