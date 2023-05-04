import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationPage = async () => {
      const currentUser = await getCurrentUser();
      if(!currentUser){
            return(
                  <ClientOnly>
                        <EmptyState title="unauthorized" subtitle="please login" />
                  </ClientOnly>
            )
      }
      const reservations = await getReservations({authorId: currentUser.id})
      if(reservations.length === 0){
            return(
                  <ClientOnly>
                        <EmptyState title="No reservations found" subtitle="You have no reservations" />
                  </ClientOnly>
            )
      }
      

      return (
            <ClientOnly>
                  <ReservationsClient reservations={reservations} currentUser={currentUser} />
            </ClientOnly>
      )
}

export default ReservationPage