import React, {useState} from "react";
import Spinner from "../loader/Spinner";
import Skeleton from "../loader/Skeleton";

const Actions = ({ actions, isActionsLoading, setSelectedAction }) => {
  const [userMessage, setUserMessage] = useState('');

  console.log('actions' + JSON.stringify(actions));
  //const actionsList = JSON.parse(actions);
  //console.log('new action list data' + JSON.stringify(actionsList));

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    // Update the state with the current input value
    setUserMessage(event.target.value);
  };

  const updateChatBotMessages = (information) => {    
    setSelectedAction(information);
    setUserMessage('');
  }

  return (
    <section>
      {/* <div className="form-reply">
        <input
          className="input-box"
          type="text"
          value={userMessage}
          onChange={handleInputChange}

          placeholder="Enter a reply..."
        />
        <button className="cta-primary" onClick={() => updateChatBotMessages(userMessage)}> &lt;&lt; Reply</button>
      </div> */}

      {actions ? (
        <div className="row actions-wrapper">

          {isActionsLoading && <Spinner />}
          <div className="column">
            <h3>{actions.heading}</h3>
            <p>{actions.intro}</p>
            <ul className="actions-list">
              {actions &&
                actions.data.map((actionItem, index) => (
                  <li key={index}>
                    {actionItem}
                    {/* <div>
                      <button className="cta" onClick={() => updateChatBotMessages(actionItem)}>
                        {actionItem}
                      </button>
                    </div> */}
                    {/* <p>{actionItem.information}</p> */}
                  </li>
                ))}
            </ul>
          </div>
          <div className="column">
            <h3>Summary</h3>
            <p>{actions.summary}</p>
          </div>
        </div>
      ) : (
        <Skeleton width={400} />
      )}
    </section>
  );
};

export default Actions;
