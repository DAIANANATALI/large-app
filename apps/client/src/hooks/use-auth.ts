import useSWR from "swr";

import type { User } from "~/types";

export default function useAuth() {
  const { data: user, isLoading } = useSWR<User>("/users/me");

  if (user) localStorage.setItem("userId", user.id);

  return { isAuthenticated: Boolean(user), isLoading, user };
}
