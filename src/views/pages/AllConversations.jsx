import React from "react";
import { Row, Col } from "reactstrap";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BusinessHours from "../tables/BusinessHoursTable";

class AllConversations extends React.Component {
  render() {
    return (
      <Row>
        <Col />

        <Col>
          <Conversations />
        </Col>
      </Row>
    );
  }
}

export default AllConversations;
