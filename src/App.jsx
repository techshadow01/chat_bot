import { useRef, useState, useEffect } from 'react'
import axios from "axios"
import './components.css';
import logo from './assets/logo.svg'
import send from './assets/send.svg'
import dsend from './assets/dsend.svg'
import day from './assets/day.svg'
import night from './assets/night.svg'

function App() {
  const [msg, setmsg] = useState("");
  const [msgArr, setmsgArr] = useState([])
  const send2 = useRef();
  const chat = useRef();
  let url = import.meta.env.VITE_URL;

  const getres = async (e) => {
    setmsgArr([...msgArr, "  .  .  .  "]);
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

  //darkmode
  const enableDarkmode = (e) => {
    ld.src = night;
    document.body.style.backgroundColor = '#000000';
    intext.style.color = '#FFFFFF';
    send2.current.getElementsByTagName("img")[0].src = dsend;
    localStorage.setItem('darkmode', 'active')
  }

  const disableDarkmode = (e) => {
    ld.src = day;
    document.body.style.backgroundColor = '#FFFFFF';
    intext.style.color = '#000000';
    send2.current.getElementsByTagName("img")[0].src = send;
    localStorage.setItem('darkmode', null)
  }

  const toggle = (e) => {
    let darkmode = localStorage.getItem('darkmode');

    if (darkmode !== "active") {
      enableDarkmode();
    }
    else {
      disableDarkmode();
    }
  }

  return (
    <>
      <div className=' bg-cyan-500 h-14 w-full flex items-center justify-around gap-3 border border-white'>
        <div className='flex items-center justify-center gap-3'>
          <span><img src={logo} alt="" /></span>
          <div className='font-bold text-white'>Chatbot</div>
        </div>
        <button onClick={toggle}>
          <img id="ld" src={day} alt="" />
        </button>
      </div>

      <div className='fixed bottom-0 w-full flex items-center justify-center'>
        <div className=' w-full border-2  border-cyan-500 rounded-full p-3 mb-1 flex items-center md:w-3/5 relative'>
          <input id="intext" className='w-11/12 outline-none break-words bg-transparent' type="text" placeholder='ask me anything...' value={msg} onChange={getmsg} />
          <button ref={send2} className='w-11 h-11 absolute border border-cyan-500 rounded-full p-1 right-1 cursor-pointer' style={msg == "" ? { backgroundColor: "transparent" } : { backgroundColor: "#06B6D4" }} onClick={sendmsg} disabled={msg == ""} ><img src={send} alt="" /></button>
        </div>
      </div >
      <div className='w-auto p-2 m-auto md:w-3/5 overflow-y-scroll ' style={{ height: 'calc(100vh - 110px)' }}>

        <div className=' flex m-2 justify-end'>
          <div className=' w-3/5 flex justify-end' >
            <div className='msgBox bg-cyan-500 '>
              Hello! How can I help you today?
            </div>
          </div>
        </div >

        {msgArr.map((item, index) => {
          return <div ref={chat} key={index} className=' flex m-2' style={index % 2 == 0 ? { justifyContent: 'left' } : { justifyContent: 'right' }}>

            {index % 2 == 0 && <div className=' w-3/5 flex justify-start' >
              <div className='msgBox bg-gray-400 break-words'>
                {item}
              </div>
            </div>}

            {index % 2 == 1 && <div className=' w-3/5 flex justify-end' >
              <div className='msgBox bg-cyan-500 break-words'>
                {item}
              </div>
            </div>
            }
          </div >
        })}
      </div>
    </>
  )
}

export default App
