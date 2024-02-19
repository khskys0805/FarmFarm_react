import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get("/api/test")
        .then((res) => {
          setHello(res.data);
          console.log("dd : " + res.data);
        })
  }, []);
  return (
      <div className="App">
        백엔드 데이터 : {hello}
        백엔드 데이터 : {hello}
      </div>
  );
}

export default App;
