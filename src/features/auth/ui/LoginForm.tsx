import { FormEvent, useState } from "react";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { useLogin } from "@features/auth/model/useLogin";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("designer@lovable.dev");
  const [password, setPassword] = useState("demo");
  const { submit, loading, error, clearError } = useLogin(() => onSuccess?.());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await submit({ email, password });
    } catch {
      // error handled in hook state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="title-h2">팀 계정으로 로그인</p>
          <p className="body-s text-text3">비밀번호는 demo 로 고정된 프로토타입입니다.</p>
        </div>
        <div className="h-0.5 w-16 bg-accent" aria-hidden />
      </div>

      <Input
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearError();
        }}
        placeholder="you@company.com"
        required
      />
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearError();
        }}
        placeholder="demo"
        hint="데모 환경: demo"
        required
      />

      {error && <div className="body-s text-danger">{error}</div>}

      <div className="flex items-center gap-3">
        <Button type="submit" label="로그인" loading={loading} />
        <Button type="button" variant="tertiary" label="도움말" onClick={() => alert("demo 비밀번호를 사용하세요")}/>
      </div>
    </form>
  );
};
