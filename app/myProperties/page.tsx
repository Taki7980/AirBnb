import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import { getCurrentUser } from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import TripsClient from "./MyPropertiesClient"
import getListings from "../actions/getListings"
import MyPropertiesClient from "./MyPropertiesClient"


const myPropertiesPage = async () => {

      const currentUser = await getCurrentUser()
      if (!currentUser) {
            return (
                  <ClientOnly>
                        <EmptyState title="unauthorized" subtitle="please login" />
                  </ClientOnly>
            )
      }

      const listings = await getListings({ userId: currentUser.id })
      if (listings.length === 0) {
            return (
                  <ClientOnly>
                        <EmptyState title="No Properties found" subtitle="You have no propperties " />
                  </ClientOnly>
            )
      }

      return (
            <ClientOnly>
                  <MyPropertiesClient listings={listings} currentUser={currentUser} />
            </ClientOnly>
      )
}

export default myPropertiesPage