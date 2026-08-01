export type Currency = "EUR" | "USD";
export type SourceKind = "direct" | "calculated" | "missing";
export type MoneyBlock = { inventory: number | null; va: number | null; currency: Currency; sourceText: string | null };
export type VehicleBlock = { location: string; deposited: number | null; invoiced: number | null; pendingInvoice: number | null; pendingInvoiceSource: SourceKind; sourceText: string | null };
export type QuantifiedCargo = { quantity: number; unit: string; description: string; location: string | null; sourceText: string };
export type SourceTrace = { section: string; sourceText: string; result: string; kind: SourceKind };
export type LogisticsDashboardData = {
  fileName: string; sheetName: string; reportTitle: string; reportDate: string | null;
  inBondVehicles: VehicleBlock; consignmentVehicles: VehicleBlock; nwiValues: MoneyBlock; humsValues: MoneyBlock;
  palcoLocations: string[]; provinces: string[]; cargoGroups: string[]; cargoStatuses: string[];
  quantifiedCargo: QuantifiedCargo[]; mentionedEntities: string[]; warnings: string[]; traces: SourceTrace[];
};
export type WorkbookParseResult = { ok: true; data: LogisticsDashboardData } | { ok: false; error: string };
