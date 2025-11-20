import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { RootState } from "../store";

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);

  if (notification.message === null) {
    return null;
  } else {
    return (
      <Alert variant="outlined" severity={notification.isAlert ? "warning" : "success"} style={{ marginTop: 10, marginBottom: 10 }}>
        {notification.message}
      </Alert>
    );
  }
};

export default Notification;
