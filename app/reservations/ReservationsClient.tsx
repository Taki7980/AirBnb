'use client';

import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";




interface ReservationsClientProps {
      reservations: SafeReservation[];
      currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
      const router = useRouter();
      const [deletingId, setDeletingId] = useState('');
      const onCancel = useCallback((id: string) => {
            setDeletingId(id);
            axios.delete(`/api/reservations/${id}`)
                  .then(() => {
                        toast.success("Reservation canceled")
                        router.refresh()
                  }).catch((error) => {
                        toast.error(error?.response?.data?.error)
                  }).finally(() => {
                        setDeletingId('');
                  })
      }, [router])
      return (
            <Container>
                  <Heading title="My Reservations" subtitle="Bookings on your Properties" />
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {reservations.map((reservation)=>(
                              <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} currentUser={currentUser} disabled={deletingId === reservation.id} actionLabel="Cancel Reservation"/>
                        ))}
                  </div>
            </Container>
      )
}

export default ReservationsClient