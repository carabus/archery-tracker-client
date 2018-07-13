import React from "react";
import { connect } from "react-redux";
import { SimpleSessionDetailsForm } from "./simple-session-details-form";
import FormattedDate from "./formatted-date";

export function NewSession(props) {
  console.log("NEW SESSION", props);
  const currentDate = new Date();
  return (
    <main role="main">
      <header>
        <h1>New Training Session</h1>
        <p>
          Started on <FormattedDate date={currentDate} />
        </p>
      </header>
      <SimpleSessionDetailsForm
        startDate={currentDate}
        dispatch={props.dispatch}
        history={props.history}
      />
    </main>
  );
}

export default connect()(NewSession);
