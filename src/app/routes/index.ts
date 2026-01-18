import { createFileRoute } from "@tanstack/react-router";
import { CommunicationPage } from "@/pages/communicaton";


export const Route = createFileRoute('/')({
  component: CommunicationPage,
});
