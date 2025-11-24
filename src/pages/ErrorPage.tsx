import { Button } from "@shared/ui/Button";

interface ErrorPageProps {
  message?: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => {
  return (
    <div className="card-surface p-8 max-w-xl mx-auto text-center space-y-4">
      <p className="title-display">문제가 발생했습니다</p>
      <p className="body-m text-text2">예상치 못한 오류가 발생했습니다. 아래 정보를 확인하거나 새로고침 해주세요.</p>
      {message && <p className="body-m text-danger">{message}</p>}
      <div className="flex gap-3 justify-center">
        <Button label="새로고침" onClick={() => window.location.reload()} />
        <Button label="홈으로" variant="secondary" onClick={() => (window.location.href = "/")} />
      </div>
    </div>
  );
};

export default ErrorPage;
