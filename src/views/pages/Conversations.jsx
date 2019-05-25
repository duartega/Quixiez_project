import React from "react";
import { ChatBubble } from "../../our-components/Chat/ChatBubble";
import { ChatFooter } from "../../our-components/Chat/ChatFooter";
import { ChatHeader } from "../../our-components/Chat/ChatHeader";
// reactstrap components
import { Badge, Card, CardBody, Row, Col } from "reactstrap";

import { joinRoom, sendMessage, receiveMessage } from "../../sockets/socket";

class Conversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };

    this.key = 1;
  }

  componentDidMount() {
    this.initialScroll();
    // Joining socket room
    joinRoom();

    receiveMessage(messageData => {
      const { message } = messageData;
      console.log(message);
      this.createMessage(true, message);
    });

    if (false) {
      setInterval(() => {
        this.createMessage();
      }, 2000);
    }
  }

  initialScroll = () => {
    this.messagesEnd.scrollIntoView(true);
  };

  // scroll to bottom of screen when called
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom(); // scroll to bottom of screen on mount
  }

  /**
   * @param {boolean | undefined} receiving
   * @param {string | undefined} message
   */
  createMessage = (receiving, message) => {
    const messages = (
      <ChatBubble
        key={this.key++}
        badgeColor="info"
        badgeLabel="Joe"
        message={receiving ? message : this.state.message}
        timePassed="7 Days"
        inverted={receiving ? true : false}
      />
    );
    // console.log(receiving, message);
    !receiving && sendMessage(this.state.message);
    const { messages: messagesState } = this.state;
    messagesState.push(messages);

    this.setState({ messages: messagesState, message: "" });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  addMessage = () => {
    if (this.state.message !== "") {
      this.messages();
    }
  };

  keyPress = e => {
    if (e.keyCode === 13 && this.state.message !== "" && !e.shiftKey) {
      e.preventDefault();
      this.createMessage();
    }
  };

  render() {
    return (
      <>
        <div ref={node => (this.chatContainer = node)}>
          <ChatHeader />

          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="A message"
            timePassed="10 hours"
            inverted
          />
          <ChatBubble
            badgeColor="info"
            badgeLabel="Joe"
            message="What's up Gabe?"
            timePassed="7 Days"
          />
          <ChatBubble
            badgeColor="info"
            badgeLabel="Joe"
            message="Hey Man Reply!"
            timePassed="7 Days"
          />

          {this.state.messages.map(amessages => {
            return amessages;
          })}

          {/* Scroll to bottom of screen on mount
           * If this div is moved below the chat
           * footer the footer will lose its
           * sticky property. */}
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
          />
          {/* </div> */}
        </div>
        <ChatFooter
          inputPlaceHolder="Enter Message"
          inputOnChange={this.handleChange}
          inputName="message"
          inputValue={this.state.message}
          inputOnKeyDown={this.keyPress}
          inputStyle={{ backgroundColor: "#27293d" }}
          buttonOnClick={this.addMessage}
        />
      </>
    );
  }
}
export default Conversations;
