import { useEffect } from "react";
import { useBlobs } from "../../../hooks/useBlobs";
import { useUser } from "../../../hooks/useUser";

export const useAccountUser = (setValue) => {
  const { user, isLoading } = useUser();

  const { pictures: avatar } = useBlobs(user?.avatar?.jpg ? [user?.avatar?.jpg] : [], [
    "user",
    "avatar",
    user?.id,
  ]);

  useEffect(() => {
    if (!isLoading && user && avatar) {
      setValue("name", user?.name);
      setValue("lastName", user?.lastName);
      setValue("phone", user?.phone || "");
      setValue("email", user?.email);
      setValue("avatar", avatar);
    }
  }, [setValue, user, isLoading, avatar]);

  return {
    user: user || null,
    avatar: avatar,
  };
};
