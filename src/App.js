import './App.css';
import {db} from '../src/config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc,getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';


function App() {
  const [ChannelList,setChannelList] = useState([]);
  const [chName,setChName] = useState('');
  const [chSub,setChSub] = useState(0);
  const [docId,setdocId] = useState(null);

 const CollectionRef = collection(db,"ytchannels")
  
// Edit Methode
const updateChannel = async () => {
  const channelDoc = doc(db, "ytchannels", docId);
  await updateDoc(channelDoc, {
    channelName: chName, 
    sub: chSub,
  });
  getChannelList();
};


const editChannel = async (id) => {
  const channelDoc = doc(db, "ytchannels", id);
  const channelSnapshot = await getDoc(channelDoc);

  if (channelSnapshot.exists()) {
    const channelData = channelSnapshot.data();
    console.log(channelSnapshot.id);
    console.log(channelData);
    // Now you can use channelData for further processing or updating the state
    setChName(channelData.channelName);
    setChSub(channelData.sub);
    setdocId(id); // Corrected line
  } else {
    console.error('Channel not found');
  }
}



//  get MEthod
 const getChannelList = async()=>{

    const data = await getDocs(CollectionRef)

    const filteredData = data.docs.map((doc)=>(
      {...doc.data(),
      
        id:doc.id
      }

    ))
    setChannelList(filteredData);
    setChName("");
    setChSub(0);
  }

  useEffect(()=>{
    getChannelList()
  },[])


// Delete Channel
  const deleteChannel = async (id) => {
    const channelDoc = doc(db, "ytchannels", id);
    await deleteDoc(channelDoc)
      .then(() => {
        // Document deleted successfully, now update the channel list
        getChannelList();
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
      alert("Are you sure delete the file");
  };



// POST METHOD
  const postData = async () => {
    await addDoc(CollectionRef, {
      channelName: chName,
      sub: chSub,
      
    })
      .then(() => {
        // Data added successfully, now update the channel list
        getChannelList();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
      alert('your details are added');
  };
  
  return (
    <div className="App">
      <h3>PRITHWIRAJ</h3>
      <input type='text' placeholder='Enter a Channel Name' value={chName} onChange={(e)=>setChName(e.target.value)}/>
      <input type='num' placeholder='details of Subscribares' value={chSub} onChange={(e)=>setChSub(e.target.value)}/>
      <button onClick={postData}>Submit</button>
      <button onClick={updateChannel}>update</button>
      {
        ChannelList.map((channel)=>(
          <div key={channel.id}>
            <h1>{channel.channelName}</h1>
            <h5>{channel.sub}</h5>
            <button onClick={()=>deleteChannel(channel.id)}>Delete</button>
            <button onClick={()=>editChannel(channel.id)}>Edit</button>
          </div>

        ))
      }
    </div>
  );
}

export default App;
