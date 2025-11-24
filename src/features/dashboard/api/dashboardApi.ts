import { delay } from "@shared/lib/helpers";

export interface DashboardKpi {
  id: string;
  label: string;
  value: number;
  trend: "up" | "down" | "flat";
  unit?: string;
}

export interface DashboardResponse {
  kpis: DashboardKpi[];
  updatedAt: string;
}

export const dashboardApi = {
  fetchOverview: async (): Promise<DashboardResponse> => {
    await delay(500);
    return {
      updatedAt: new Date().toISOString(),
      kpis: [
        { id: "revenue", label: "MRR", value: 48200000, trend: "up", unit: "₩" },
        { id: "users", label: "활성 사용자", value: 12680, trend: "up" },
        { id: "latency", label: "p95 응답(ms)", value: 183, trend: "down" },
        { id: "churn", label: "이탈률", value: 3.2, trend: "flat", unit: "%" },
      ],
    };
  },
};
