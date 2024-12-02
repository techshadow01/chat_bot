import Sign from './ui/sign.jsx'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import axios from "axios"
import './components.css';
import arrow1 from './assets/arrow1.svg'
import logo from './assets/logo.svg'
import day from './assets/day.svg'
import night from './assets/night.svg'
import send from './assets/arrow.svg'
import Load from './assets/load.gif'

import { TypewriterEffectSmooth } from './type.jsx'

function App() {
  const [msg, setmsg] = useState("");
  const [msgArr, setmsgArr] = useState([])
  const chat = useRef();
  const [arrow, setarrow] = useState("false")
  const [arrow1t, setarrow1t] = useState("false")
  let url = import.meta.env.VITE_URL;

  const getres = async (e) => {
    setmsgArr([...msgArr, "loading"]);
    let a = await axios({
      url: url,
      method: "post",
      data: { "contents": [{ "parts": [{ "text": e }] }] }
    })
    setmsgArr([...msgArr, (a['data']['candidates']['0']['content']['parts']['0'].text)]);
  }

  useEffect(() => {
    let darkmode = localStorage.getItem('darkmode')
    darkmode == "active" ? enableDarkmode() : disableDarkmode()
  }, [])



  useEffect(() => {
    if (msg != ("")) {
      getres(msg);
      setmsg("");
    }
    if (chat.current != null) {
      chat.current.scrollIntoView();
    }
  }, [msgArr])


  const getmsg = (e) => {
    setmsg(e.target.value);
  }

  const sendmsg = (e) => {
    setmsgArr([...msgArr, msg])
  }

  const fsendmsg = (e) => {
    setmsgArr([...msgArr, e])
    setmsg(e)
  }

  const showa1 = () => {
    setarrow1t(!arrow1t)
  }

  //darkmode
  const enableDarkmode = (e) => {
    ld.src = night;
    fbody.className = 'w-screen h-screen bg-[#121212]';
    document.getElementsByClassName("log-in").backgroundColor = '#222222'
    localStorage.setItem('darkmode', 'active')
  }

  const disableDarkmode = (e) => {
    ld.src = day;
    fbody.className = 'w-screen h-screen bg-gradient-to-br from-indigo-600 to-purple-600';
    document.getElementsByClassName("log-in").backgroundColor = '#FFFFFF'
    localStorage.setItem('darkmode', null)
  }

  const estyle = { backgroundColor: "transparent" }

  const fstyle = {
    background: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)'
  };

  const toggle = (e) => {
    let darkmode = localStorage.getItem('darkmode');

    if (darkmode !== "active") {
      enableDarkmode();
    }
    else {
      disableDarkmode();
    }

    setarrow(!arrow);
  }

  function TypewriterEffectSmoothDemo() {
    const words = [
      {
        text: "Hello! how can i help you today ?",
      }
    ];
    return (
      (<div className="flex flex-col items-center justify-center h-[100%] m-auto">
        <TypewriterEffectSmooth words={words} />
        <motion.div

          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: -6, transition: { duration: .7, delay: 3 } }}

          className='flex items-center justify-center gap-2 flex-wrap'>
          <motion.div whileHover={{ y: 6 }} className='typeb trans' onClick={() => fsendmsg("tell me a joke")}>Tell a joke</motion.div>
          <motion.div whileHover={{ y: 6 }} className='typeb trans' onClick={() => fsendmsg("Surprise me")}>Surprise me</motion.div>
          <motion.div whileHover={{ y: 6 }} className='typeb trans' onClick={() => fsendmsg("Suggest song")}>Suggest song</motion.div>
          <motion.div whileHover={{ y: 6 }} className='typeb trans' onClick={() => fsendmsg("Write a story")}>Write a story</motion.div>
        </motion.div>
      </div >)
    );
  }

  return (
    <>
      <div id='fbody' className='w-screen h-screen bg-gradient-to-br from-indigo-600 to-purple-600'>
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }}
          className='relative top-5 trans h-16 w-[60%] flex items-center justify-between gap-3 m-auto px-4 rounded-2xl max-sm:w-[95%] z-20'>
          <div className='flex items-center justify-center gap-3'>
            <a href='./'><div className='flex items-center justify-center gap-3'>
              <span>
                <img src={logo} alt="" />
              </span>
              <div className='font-bold text-white'>Chatbot</div>
            </div></a>

            <div className='relative inline-block'>
              <motion.div
                animate={arrow1t ? { rotate: 0 } : { rotate: 180 }}
                onClick={showa1}
              >
                <img src={arrow1} alt="" />
              </motion.div>
              <AnimatePresence>
                {!arrow1t && <a href="https://alice-ai-ten.vercel.app/">
                  <motion.button
                    className="absolute  text-white font-bold border-gradient-to-br from-indigo-600 to-purple-600 border-2 p-2 rounded-lg left-[-20px] top-9 ptrans"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0, y: -10 }}

                  >AliceAI</motion.button>
                </a>}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button

              whileTap={{ scale: [null, 0.6] }}

              onClick={toggle}>
              <img id="ld" src={day} alt="" />
            </motion.button>
            <div className="rounded-full bg-white "><Sign /></div>
          </div>

        </motion.div >

        <div
          id="footer"
          className='fixed bottom-0 w-full flex items-center justify-center'>
          <div className=' w-[90%] border-2 border-white rounded-full p-3 mb-1 flex items-center md:w-3/5 relative text-white'>
            <input
              id="intext" className='w-11/12 outline-none break-words bg-transparent'
              type="text"
              placeholder='ask me anything...'
              value={msg}
              onChange={getmsg} />
            <motion.button
              whileTap={{ scale: [null, 0.8, 1] }}
              // {...msg == "" && (animate = { width: '50%' })}
              className='w-11 h-11 absolute rounded-full p-1 right-1 cursor-pointer'
              style={msg == "" ? estyle : fstyle}
              onClick={sendmsg} disabled={msg == ""} ><img src={send} alt="" />
            </motion.button>
          </div>
        </div >

        <div className='w-auto mt-6 m-auto md:w-3/5 overflow-y-scroll max-sm:px-3' style={{ height: 'calc(100vh - 150px)' }}>

          {msgArr.length == 0 && TypewriterEffectSmoothDemo()}

          {msgArr.map((item, index) => {
            return <div
              ref={chat}
              key={index}
              className=' flex m-2'
              style={index % 2 == 0 ? { justifyContent: 'left' } : { justifyContent: 'right' }}
            >

              {index % 2 == 0 && <div className=' w-3/5 flex justify-start' >
                <div className='msgBox rounded-tl-[0px] break-words trans'>
                  {item}
                </div>
              </div>}

              {index % 2 == 1 && <div className=' w-[80%] flex justify-end' >
                <div className='msgBox rounded-tr-[30px] break-words ptrans'>
                  {
                    item == "loading" && <div className='h-6 w-8 flex items-center justify-center'> <img src={Load} alt=". . ." /></div>
                  }
                  {item != "loading" && item}
                </div>
              </div>
              }
            </div >
          })}
        </div >
      </div >
    </>
  )
}

export default App