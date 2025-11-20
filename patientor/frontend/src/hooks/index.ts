import { useAppDispatch } from '../store';
import { notify } from "../reducers/notification";
import { initializeDiagnoses } from "../reducers/diagnoses";
// import { initializePatients } from "../reducers/patients"; // if sometime decide to put patients into redux

export const useNotification = () => {
  const dispatch = useAppDispatch();

  return (message: string, isAlert: boolean, time: number) => {
    dispatch(notify(message, isAlert, time));
  };
};

export const useInitialization = () => {
  const dispatch = useAppDispatch();

  return () => {
    // dispatch(initializePatients()); // if sometime decide to put patients into redux
    dispatch(initializeDiagnoses());
  };
};