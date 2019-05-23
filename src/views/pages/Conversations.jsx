import React from "react";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";
import { ChatBubble } from "../../our-components/ChatBubble";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  ListGroupItem,
  ListGroup,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Widgets extends React.Component {
  constructor() {
    super();
    this.showNormalBubble = false;
    this.state = {
      testBubble: [],
      message: "",
    };
    this.key = 1;
    this.handleChange = this.handleChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }
  componentDidMount() {
    this.scrollToBottom(); // scroll to bottom of screen on mount
  
    {
      /* If you want to see the chat bubble come in switch to true*/
    }
    if (false) {
      setInterval(() => {
        this.testBubble();
      }, 2000);
    }
  }

   // scroll to bottom of screen when called
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scrollToBottom();  // scroll to bottom of screen on mount
  }

  getNormalBubble = () =>
    this.showNormalBubble ? (
      <Row className="mx-xl-xl">
        <Col>
          <Card className="card-timeline  card-plain ">
            <CardBody>
              <ul className="timeline timeline-simple">
                {/* <ul className="our-timeline"> */}
                <li
                  className="timeline-inverted"
                  // style={{ backgroundColor: "red" }}
                >
                  {/** this will invert the message bubble if class name taken out */}
                  <div className="timeline-badge danger"> A </div>
                  {/** For first letter of the persons name */}
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <Badge color="danger">Alexis</Badge>
                    </div>
                    <div className="timeline-body">
                      <p>
                        YES, I would like to also get a metal grinder. 1 ounce
                        of blue diesel and 3 grams of grape pie as well.
                      </p>
                    </div>
                    <h6>
                      <i className="ti-time" />
                      11 hours ago via quixiez
                    </h6>
                  </div>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    ) : null;

  testBubble = () => {
    const testBubble = (
      <ChatBubble
        key={this.key++}
        badgeColor="info"
        badgeLabel="Joe"
        message= {this.state.message}
        timePassed="7 Days"
        // inverted
      />
    );
    const { testBubble: testBubbleState } = this.state;
    testBubbleState.push(testBubble);

    this.setState({ testBubble: testBubbleState, message: "" });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  addMessage = () => {
    if (this.state.message !== "") {
      this.testBubble();
    }
  }

  keyPress = e => {
    if (e.keyCode == 13 && this.state.message !== "") {
      this.testBubble();
    }
 }

  render() {
    return (
      <>
        <div className="content"
          style={{height:"100%", overflow:"auto"}}>
          {this.getNormalBubble()}
          <div
          // style={{ backgroundColor: "blue" }}
          >
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

            <ChatBubble
              badgeColor="warning"
              badgeLabel="Gabe"
              message="Hey Joe"
              timePassed="7 Days"
              inverted
            />

            <ChatBubble
              badgeColor="warning"
              badgeLabel="Gabe"
              message="Hey Test Bubble"
              timePassed="7 Days"
              inverted
            />

            {this.state.testBubble.map(aTestBubble => aTestBubble)}
          </div >
        </div>

        <br/><br/><br/>
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <Row>
          <Col md="9">
          <Input placeholder="Enter Message"
            onChange={this.handleChange}
            name={"message"}
                value={this.state.message}
                onKeyDown={this.keyPress}
                autoFocus
                style={{backgroundColor: "#27293d"}}
              />
          </Col>
          <Col lg="3">
            <Button onClick={this.addMessage} >Send</Button>
            </Col>
            </Row>
          </div>
        {/* Scroll to bottom of screen on mount */}
        <div ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </>
    );
  }
}

export default Widgets;
