import { createActor } from "@/backend";
import type { UserRole } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { identity, isLoginSuccess, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const profileQuery = useQuery({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      // getCallerUserProfile is exposed via MixinAuthorization
      const actorAny = actor as unknown as {
        getCallerUserProfile?: () => Promise<{
          name: string;
          role: string;
        } | null>;
      };
      if (actorAny.getCallerUserProfile) {
        return actorAny.getCallerUserProfile();
      }
      return null;
    },
    enabled: !!actor && !actorFetching && isLoginSuccess,
    retry: false,
  });

  const role: UserRole = (() => {
    if (!isLoginSuccess || !identity) return "guest";
    const profileRole = (profileQuery.data as { role?: string } | null)?.role;
    if (profileRole === "admin") return "admin";
    return "patient";
  })();

  return {
    identity,
    isAuthenticated: isLoginSuccess,
    isLoading: actorFetching || profileQuery.isLoading,
    loginStatus,
    role,
    profile: profileQuery.data as
      | { name: string; role: string }
      | null
      | undefined,
    principalId: identity?.getPrincipal().toString(),
  };
}

export function useIsAdmin() {
  const { role } = useAuth();
  return role === "admin";
}
