import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/tickets">
          Tickets
        </Link>
      </div>
    )
  }
}

export default Dashboard;
