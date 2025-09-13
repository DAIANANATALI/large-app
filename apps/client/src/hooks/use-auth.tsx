import type { User } from "types";

import useSWR from "swr";

export default function useAuth() {
  const { data: user } = useSWR<User>("/users/me");

  return { isAuthenticated: Boolean(user), user };
}
