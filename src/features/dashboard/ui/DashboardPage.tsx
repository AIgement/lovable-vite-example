import { useDashboard } from "@features/dashboard/model/useDashboard";
import { formatCurrency } from "@shared/lib/helpers";

const TrendPill = ({ trend }: { trend: "up" | "down" | "flat" }) => {
  const label = trend === "up" ? "상승" : trend === "down" ? "하락" : "유지";
  const color =
    trend === "up"
      ? "text-successAux bg-[rgba(115,162,109,0.18)]"
      : trend === "down"
      ? "text-danger bg-[rgba(230,85,80,0.15)]"
      : "text-accent bg-[rgba(69,201,188,0.18)]";
  return <span className={`px-3 h-6 inline-flex items-center rounded-pill body-s ${color}`}>{label}</span>;
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((key) => (
      <div key={key} className="card-surface h-24 animate-pulse bg-bg2" />
    ))}
  </div>
);

export const DashboardPage = () => {
  const { overview, loading, error, trendSummary } = useDashboard();

  if (loading) return <LoadingSkeleton />;
  if (error || !overview) return <div className="text-danger">{error || "데이터를 불러오지 못했습니다."}</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="title-h1">운영 KPI</p>
            <p className="body-s text-text3">{trendSummary}</p>
          </div>
          <span className="caption text-text3">업데이트: {new Date(overview.updatedAt).toLocaleString("ko-KR")}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {overview.kpis.map((kpi) => (
            <div key={kpi.id} className="card-surface p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="title-h2">{kpi.label}</p>
                <TrendPill trend={kpi.trend} />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-[28px] leading-[36px] font-semibold tracking-[-0.02em]">
                  {kpi.unit === "₩" ? formatCurrency(kpi.value) : kpi.unit ? `${kpi.value}${kpi.unit}` : kpi.value}
                </p>
                <span className="caption text-text3">최근 24시간</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
