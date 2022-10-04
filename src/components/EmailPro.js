import React from "react";
import emailjs from "emailjs-com";
import { Button } from "@material-ui/core";

export default function EmailPro(props) {
  const { message, email } = props;
  var template_params = {
    message: message,
    email: email,
  };

  var service_id = "default_service";
  var template_id = "contact_form";
  var user_id = "user_0s0p6hVDhQaHTDwYYA0vo";

  function sendEmail() {
    emailjs.send(service_id, template_id, template_params, user_id);
    props.toggleContactForm();
    props.emailSent();
  }

  return (
    <Button
      size="large"
      style={{ backgroundColor: "#4CAF50", color: "white", marginBottom: 20 }}
      variant="contained"
      onClick={sendEmail}
    >
      Send
    </Button>
  );
}
