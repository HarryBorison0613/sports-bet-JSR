import React, { useState } from "react";
import VideoPopup from 'src/components/Success/VideoPopup';
import Steps from 'src/components/Success/Steps';
import Reasons from 'src/components/Success/Reasons';
import Bottom from 'src/components/Success/Bottom';
import Layout from "src/layouts/Success/Success";

export default function Deposito() {
  return (
    
      <>
        <Layout>
           <VideoPopup />
           <Steps />
           <Reasons />
           <Bottom />
        </Layout>
        
      </>
    
  )
}