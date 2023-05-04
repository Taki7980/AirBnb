'use client';

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser, safeListings } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface MyPropertiesClientProps {
      currentUser: SafeUser | null;
      listings?: safeListings[];
}

const MyPropertiesClient: React.FC<MyPropertiesClientProps> = ({ currentUser, listings }) => {
      const router = useRouter();
      const [deletingId, setDeletingId] = useState('');
      const onCancel = useCallback((id: string) => {
            setDeletingId(id);
            axios.delete(`/api/listings/${id}`)
                  .then(() => {
                        toast.success("Property Removed")
                        router.refresh()
                  }).catch((error) => {
                        toast.error(error?.response?.data?.error)
                  }).finally(() => {
                        setDeletingId('');
                  })
      }, [router])
      return (
            <Container>
                  <Heading title="My Properties" subtitle="list of your properties" />
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {listings?.map((listing)=>(
                              <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onCancel} currentUser={currentUser} disabled={deletingId === listing.id} actionLabel="Cancel Property"/>
                        ))}
                  </div>
            </Container>
      )
}

export default MyPropertiesClient