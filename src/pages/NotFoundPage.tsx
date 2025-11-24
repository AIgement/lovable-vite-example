import { Button } from "@shared/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="card-surface p-8 max-w-xl mx-auto text-center space-y-4">
      <p className="title-display">404</p>
      <p className="body-m text-text2">요청하신 페이지를 찾을 수 없습니다.</p>
      <Button label="홈으로 돌아가기" onClick={() => (window.location.href = "/")} />
    </div>
  );
};

export default NotFoundPage;
