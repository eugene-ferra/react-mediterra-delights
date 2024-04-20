import { useUser } from "../../../hooks/useUser";
import { useEffect } from "react";

export const useUserData = (setValue) => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user && !isLoading) {
      setValue("name", user.name);
      setValue("lastName", user.lastName);
      setValue("phone", user.phone);
      setValue("email", user.email);
    }
  }, [user, isLoading, setValue]);
};
