import { message } from "antd";
import _ from "lodash";

const errorMessageByCodeStatus = {
  400: { msg: "error.server.not.understand", label: "error.bad.request" },
  401: { msg: "error.unauthorized", label: "error.header" },
  403: { msg: "error.server.rejected", label: "error.forbidden" },
  404: { msg: "error.request.not.found", label: "error.header" },
  408: { msg: "error.request.time.out", label: "error.header" },
  409: { msg: "error.already.exists", label: "error.conflict" },
  500: { msg: "error.contact.admin", label: "error.unexpected" }
};

function notifyError(payload) {
  const { err } = payload;

  try {
    const {
      response: { status }
    } = err;
    const defaultMsg = _.get(
      errorMessageByCodeStatus,
      [status, "msg"],
      "error.contact.admin"
    );

    message.error(defaultMsg);
  } catch (err2) {
    message.error("error.contact.admin");
  }
}

export default {
  errorMessageByCodeStatus,
  notifyError
};
