import React, { useState } from "react";
import Filter from '/component/Filter';
import Layout from "/component/layouts/layout";


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (

    <>
  
    <Layout>
          <Filter />
    </Layout>
  
  </>
  )
}

