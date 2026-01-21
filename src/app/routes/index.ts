import { createFileRoute } from "@tanstack/react-router";
import { CommunicationPage } from "@/pages";


export const Route = createFileRoute('/')({
  component: CommunicationPage,
});
