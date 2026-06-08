import type { Metadata } from "next";
import Daily94Client from "./daily94-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 94 (Kubernetes fundamental)",
  description:
    "Introduccion a Kubernetes: clusters, nodes, pods, deployments, services, ReplicaSets, ConfigMaps, Secrets y namespaces.",
};

export default function Daily94Page() {
  return <Daily94Client />;
}
