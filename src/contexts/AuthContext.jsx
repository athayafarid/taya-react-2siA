import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { authService } from "@/services/authService";
import { profileService } from "@/services/profileService";
import { supabase } from "@/lib/supabase";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return null;
    }

    const currentProfile = await profileService.getCurrentProfile(authUser.id);
    setProfile(currentProfile);
    return currentProfile;
  }, []);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const currentSession = await authService.getSession();
      const currentUser = currentSession?.user ?? null;

      setSession(currentSession);
      setUser(currentUser);
      await loadProfile(currentUser);
    } finally {
      setLoading(false);
    }
  }, [loadProfile]);

  useEffect(() => {
    refreshSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      const nextUser = nextSession?.user ?? null;

      setSession(nextSession);
      setUser(nextUser);

      if (nextUser) {
        try {
          await loadProfile(nextUser);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile, refreshSession]);

  const value = useMemo(() => {
    const role = profile?.role ?? null;

    return {
      session,
      user,
      profile,
      role,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: role === "admin",
      isMember: role === "member",
      refreshSession,
    };
  }, [loading, profile, refreshSession, session, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
