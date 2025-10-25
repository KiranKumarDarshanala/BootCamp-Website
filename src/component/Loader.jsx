import React from 'react'
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <section className={style.section}>
        <div className={style.loader}></div>
      </section>
    </>
  )
}

export default Loader
