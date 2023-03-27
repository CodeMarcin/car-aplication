import { useDispatch } from "react-redux";
import { resetRefetch } from "../redux/sliceRefetch";

interface IUseReduxRefetch {
  refetch: () => Promise<any>;
}

export const useReduxRefetch = ({ refetch }: IUseReduxRefetch) => {
  const dispatch = useDispatch();

  const reduxRefetchCall = async () => {
    try {
      await refetch();
      dispatch(resetRefetch());
    } catch (err) {
      console.error(err);
    }
  };

  return reduxRefetchCall;
};
