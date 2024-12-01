import { MainLayout } from "@/shared/components";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout className="flex-1 p-4 overflow-y-auto">
      {children}
    </MainLayout>
  );
}
