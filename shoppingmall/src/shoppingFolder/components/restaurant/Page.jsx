import {useState } from "react";

import Main from "./main";
import Book from "./book";
import ThankYou from "./thankYou";
import Navbar from "./navbar";
import '../css/Page.css'
import React from 'react'

const Page = () => {
    const [page, setPage] = useState(0);
  return (
    <div>
      <Navbar setPage={setPage} />
      {page === 0 ? <Main setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 2 ? <ThankYou /> : null}
    </div>
  )
}

export default Page
