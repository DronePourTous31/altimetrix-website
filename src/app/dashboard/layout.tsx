import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[80vh] bg-dark-50 flex">
      <DashboardSidebar
        prenom=""
        nom=""
        typeCompte="particulier"
        abonnementActif={false}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 p-6 lg:p-8 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
