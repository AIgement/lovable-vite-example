import { useMemo } from "react";
import { dashboardApi } from "@features/dashboard/api/dashboardApi";
import { useFetch } from "@shared/hooks/useFetch";

export const useDashboard = () => {
  const { data, loading, error } = useFetch(dashboardApi.fetchOverview, []);

  const trendSummary = useMemo(() => {
    if (!data) return "";
    const ups = data.kpis.filter((kpi) => kpi.trend === "up").length;
    const downs = data.kpis.filter((kpi) => kpi.trend === "down").length;
    return `${ups} up / ${downs} down`;
  }, [data]);

  return { overview: data, loading, error, trendSummary };
};
