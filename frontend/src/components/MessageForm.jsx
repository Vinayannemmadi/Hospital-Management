import axios from "axios";
import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { FaReply } from "react-icons/fa";

const MessageForm = () => {
  const [open,setOpen]=useState(false);
  const [name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const cookies=new Cookies();
  const token=cookies.get("jwttoken");
  const isdoctor=cookies.get("isdoctor");
  const isadmin=cookies.get("isadmin");
  const [messages,setMessages]=useState([]);
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/message/send",
          { name, email, phone, text,token },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setEmail("");
          setPhone("");
          setText("");
        });
        toast.success("Message has been sent")
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message.Try again later");
    }
  };
  useEffect(()=>{
      async function getMessages(){
        try{
          const {data}=await axios.get("http://localhost:4000/api/message/getAllMessages");
          console.log(data);
          setMessages(data);
        } catch(err){
          console.log(err);
        }
      }
      getMessages();
  },[]);

  const [openReplies, setOpenReplies] = useState({});
  const [replies, setReplies] = useState({});

  const toggleReplyInput = (index) => {
    setOpenReplies((prevOpenReplies) => ({
      ...prevOpenReplies,
      [index]: !prevOpenReplies[index],
    }));
  };

  const handleTextChange = (index, text) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [index]: text,
    }));
  };

  const handleSendReply = async(index,from) => {
    const d=await axios.post("http://localhost:4000/api/reply/send",
    {token,text:replies[index],to:from});
    console.log(d.data);
    setReplies((prevReplies) => ({
      ...prevReplies,
      [index]: '',
    }));

    // Close the reply input after sending
    setOpenReplies((prevOpenReplies) => ({
      ...prevOpenReplies,
      [index]: false,
    }));
    console.log(replies);
  };
  return (
    <>
      {!isdoctor && !isadmin ? <div className="container form-component message-form">
        <h2>Share your problem with us</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              placeholder="Name" required={true}
              value={name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              required={true}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <textarea
            rows={7}
            placeholder="Problem"
            value={text} required={true}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" />
      </div>:

      <div className='notifications-container'>
          <h1>Messages</h1>
          <ul className="notifications-list">
          {messages.map((mes, index) => (
            <li key={index} className="notification-item">
              <div className="message-content">
                <span className="notification-text">{mes.text}</span>
                <button onClick={() => toggleReplyInput(index)}>
                  <FaReply />
                </button>
              </div>
              {openReplies[index] && (
                  <div className="reply-container">
                    <input
                      style={{width:"80%",padding:10}}
                      placeholder="send reply"
                      value={replies[index] || ''}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                    />
                    <button 
                    onClick={() => handleSendReply(index,mes.from)}
                    className="messageForm-replyBtn">Send</button>
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
      }
    </>
  );
};

export default MessageForm;
