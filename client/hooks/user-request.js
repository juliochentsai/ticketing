import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSucess }) => {
  //Method === 'post', 'get' ,
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSucess) {
        onSucess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oooop........</h4>
          <ul className="my-0">
            {err.response.data.errors.map((x) => (
              <li key={x.message}>{x.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
