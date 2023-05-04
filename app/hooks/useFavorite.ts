
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModel from "./useLogInModel";

interface IUseFavoriteProps {
      listingId: string;
      currentUser?: SafeUser | null;
}
const useFavorite = ({ listingId, currentUser }: IUseFavoriteProps) => {
      const router = useRouter();
      const loginModel = useLoginModel();

      const hasFavorite = useMemo(() => {
            const list = currentUser?.favoriteIds || [];
            return list.includes(listingId);
      }, [currentUser, listingId]);

      const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (!currentUser) {
                  return loginModel.onOpen();
            }
            try {
                  let request;

                  if (hasFavorite) {
                        request = () => axios.delete(`/api/favorites/${listingId}`);
                  }
                  else {
                        request = () => axios.post(`/api/favorites/${listingId}`);
                  }

                  await request();
                  router.refresh();
                  toast.success(`Success`);

            }
            catch (error) {
                  toast.error("Something went wrong");
            }
      }, [currentUser, hasFavorite, listingId, loginModel, router]);

      return {
            hasFavorite,
            toggleFavorite
      }
}

export default useFavorite;