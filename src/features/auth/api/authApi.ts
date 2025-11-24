import { delay } from "@shared/lib/helpers";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export const authApi = {
  login: async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
    await delay(600);
    if (!email || !password) {
      throw new Error("이메일과 비밀번호를 입력하세요.");
    }

    const isDemo = password === "demo";
    if (!isDemo) {
      throw new Error("로그인에 실패했습니다. 비밀번호는 demo 입니다.");
    }

    return {
      token: "mock-token-123",
      user: {
        name: email.split("@")[0] || "User",
        email,
        role: "admin",
      },
    };
  },
};
