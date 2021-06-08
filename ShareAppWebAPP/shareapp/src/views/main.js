import React from "react";
import { useState } from "react";
import "./../App.css";


import { sAPIURL } from "./config";

export default function Main() {
  const [showButtons, setShowButtons] = useState(true);
  const [actionType, setActionType] = useState(null);
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [data, setData] = useState(null);
  const [receiveNameData, setReceiveNameData] = useState(null);
  const [showreceiveNameModal, setShowreceiveNameModal] = useState(false);
  
  const [dataAPI, setDataAPI] = useState(null);
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);

  const [dataAPIName, setDataAPIName] = useState(null);
  const [dataAPIType, setDataAPIType] = useState(null);
  const [dataAPIData, setDataAPIData] = useState(null);

  const actionButtonClick = (type) => {
    setShowButtons(false);
    setShowCodeBox(true);
    setActionType(type);
  };
  const sendSubmit = () => {
    var url = sAPIURL + "send/"+name+"/" + code + "/text/" + data;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if(json.message=="Uploaded")
        alert("Data Sent");
        
      });
  };

  const receiveSubmitName = () => {
    //  debugger;
    var url = sAPIURL + "receivelist/" + code;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setReceiveNameData(json["name"]);
        alert("Receiving Data from "+json.name);
        //setShowreceiveNameModal(true);
        receiveData(json.name);
      });

  };

  const submit = () => {
    if (actionType == "send") {
        sendSubmit();
    } else {
        receiveSubmitName();
    }
  };
  const receiveData = (name) => {
    var url = sAPIURL + "receive/"+name+"/"+ code;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataAPI(json);
        //setReceiveNameData(json.name);
        //setShowreceiveNameModal(true);
      });

  };
  return (
    <>
      {showButtons && (
        <div className="main">
          <input
            type="button"
            onClick={() => {
              actionButtonClick("send");
            }}
            value="SEND"
          />{" "}
          <br />
          <input
            type="button"
            value="RECEIVE"
            onClick={() => {
              actionButtonClick("receive");
            }}
          />
        </div>
      )}
      {showCodeBox && (
        <>
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          {actionType == "send" && (
            <>
                <br/>
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
                />
                <br/>
                <input
                type="text"
                placeholder="Message"
                value={data}
                onChange={(e) => {
                    setData(e.target.value);
                }}
                />
            </>    
          )}
          <br/>
          <input
            type="button"
            onClick={() => {
              submit();
            }}
            value={actionType == "send" ? "SEND" : "RECEIVE"}
          />
        </>
      )}
     {
         dataAPI && (
             <div style={{textAlign:'center'}}>
            <table>
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Type</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{dataAPI.sender}</td>
                        <td>{dataAPI.type}</td>
                        <td>{dataAPI.value}</td>
                    </tr>
                </tbody>
            </table>
            </div>

         )
     }
    </>
  );
}
