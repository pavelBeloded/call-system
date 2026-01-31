import { StatisticsPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
  component: StatisticsPage,
});
