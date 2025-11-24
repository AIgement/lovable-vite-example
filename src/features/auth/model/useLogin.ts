import { useState } from "react";
import { useAuth } from "@shared/hooks/useAuth";
import { authApi, LoginPayload, LoginResponse } from "@features/auth/api/authApi";

export const useLogin = (onSuccess?: (response: LoginResponse) => void) => {
  const { login: persistUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submit = async (payload: LoginPayload) => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await authApi.login(payload);
      persistUser({ name: response.user.name, role: response.user.role });
      onSuccess?.(response);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "로그인 중 문제가 발생했습니다.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, clearError: () => setError(undefined) };
};
