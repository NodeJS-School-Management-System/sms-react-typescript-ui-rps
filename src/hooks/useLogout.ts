import useLocalStorage from "./useLocalStorage";
import useNavigation from "./useNavigation";

const useLogout = () => {
  const { removeLocalStorage } = useLocalStorage("userData");
  const { navigate } = useNavigation();
  return () => {
    removeLocalStorage();
    localStorage.clear();
    navigate("/auth/loginuser/");
    window.location.reload();
  };
};
export default useLogout;
