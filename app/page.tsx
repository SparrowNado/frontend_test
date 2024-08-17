"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { User } from "./types/user";

import Gallery from "./gallery";
//No longer hard coded but reading straight from the API
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from the API Provided on the original file
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        const data: User[] = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (err) {
        //setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <Gallery users={users} />
    </main>
  );
}