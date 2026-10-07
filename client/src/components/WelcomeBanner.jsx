import React, { Component } from "react";

class WelcomeBanner extends Component {
  render() {
    return (
      <section className="welcome-banner">
        <div>
          <p className="eyebrow">RV UNIVERSITY</p>
          <h1>{this.props.title}</h1>
          <p>{this.props.subtitle}</p>
        </div>
      </section>
    );
  }
}

export default WelcomeBanner;